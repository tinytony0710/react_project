import ServantList from '@/components/ServantList';
import { useState } from 'react';
import Lancer from '@/assets/Lancer.png'
import Ruler from '@/assets/Ruler.png'

export const mockMaterials = [
    { id: "proof_of_hero", name: "英雄之證"},
    { id: "evil_bone", name: "凶骨"},
    { id: "dragon_fang", name: "龍之牙"},
    { id: "void_dust", name: "虛影之塵"},
    { id: "fool_chain", name: "愚者之鎖"},
    { id: "deadly_poisonous_needle", name: "萬死的毒針"},
    { id: "mystic_spinal_fluid", name: "魔術髓液"},
    { id: "stake_of_wailing_night", name: "宵泣之鐵樁"},
    { id: "mystic_gunpowder", name: "振盪火藥"},
    { id: "small_bell_of_absolution", name: "赦免的小鐘"},
    { id: "ceremonial_sword_of_twilight", name: "黃昏的儀式劍"},
    { id: "ash_of_remembrance", name: "不忘之灰"},
    { id: "obsidian_blade", name: "黑曜銳刃"},
    { id: "remnant_of_madness", name: "瘋狂的殘渣"},

    { id: "great_knight_medal", name: "大騎士勳章"},
    { id: "shell_of_reminiscence", name: "追憶的貝殼"},
    { id: "aurora_steel", name: "極光之鋼"},
    { id: "scales_of_fantasy", name: "夢幻的鱗粉"},

    { id: "dragon_reverse_scale", name: "龍之逆鱗"},
    { id: "reactor_core_of_dawn", name: "曉光爐心"},


    { id: "saber_piece", name: "劍階銀棋"},
    { id: "archer_piece", name: "弓階銀棋"},
    { id: "lancer_piece", name: "槍階銀棋"},
    { id: "rider_piece", name: "騎階銀棋"},
    { id: "caster_piece", name: "術階銀棋"},
    { id: "assassin_piece", name: "殺階銀棋"},
    { id: "berserker_piece", name: "狂階銀棋"},

    { id: "saber_monument", name: "劍階金像"},
    { id: "archer_monument", name: "弓階金像"},
    { id: "lancer_monument", name: "槍階金像"},
    { id: "rider_monument", name: "騎階金像"},
    { id: "caster_monument", name: "術階金像"},
    { id: "assassin_monument", name: "殺階金像"},
    { id: "berserker_monument", name: "狂階金像"},
];

const ClassImageMap = {
    'Lancer': Lancer,
    'Ruler': Ruler,
}

export const mockServants = [
    {
        'id': 312,
        'name': "妖精騎士蘭斯洛特",
        'class': "Lancer",
        'ascension': [
            {},//0->1
            {'great_knight_medal': 15},
            {'dragon_fang': 24, 'dragon_reverse_scale': 3},
            {'reactor_core_of_dawn': 5, 'dragon_reverse_scale': 6},
        ],
        'skill': [
            {},//0->1 never used
            {},//1->2
            {},
            {},
            {'dragon_fang': 12},
            {'dragon_fang': 24},
            {'great_knight_medal': 10},
            {'great_knight_medal': 20, 'aurora_steel': 6},
            {'small_bell_of_absolution': 72, 'aurora_steel': 18},
            {},//9->10
        ],
        'extra_skill': [
            {},//0->1 never used
            {},//1->2
            {},
            {},
            {'void_dust': 10},
            {'void_dust': 20},
            {'dragon_reverse_scale': 2},
            {'dragon_reverse_scale': 4, 'reactor_core_of_dawn': 4},
            {'scales_of_fantasy': 24, 'reactor_core_of_dawn': 11},
            {},//9->10
        ],
    },
    {
        'id': 390,
        'name': "美露莘",
        'class': "Ruler",
        'ascension': [
            {'archer_piece': 5, 'lancer_piece': 5, 'rider_piece': 5},//0->1
            {'saber_piece': 5, 'caster_piece': 5, 'assassin_piece': 5, 'berserker_piece': 5},
            {'archer_monument': 5, 'lancer_monument': 5, 'rider_monument': 5},
            {'saber_monument': 5, 'caster_monument': 5, 'assassin_monument': 5, 'berserker_monument': 5},
        ],
        'skill': [
            {},//0->1 never used
            {},//1->2
            {},
            {},
            {},
            {},
            {},
            {'shell_of_reminiscence': 12},
            {'dragon_reverse_scale': 15},
            {},//9->10
        ],
        'extra_skill': [
            {},//0->1 never used
            {},//1->2
            {},
            {},
            {},
            {},
            {},
            {'great_knight_medal': 30},
            {'scales_of_fantasy': 30},
            {},//9->10
        ],
    },
];

function FGOCalculator() {
    // 狀態 1：已選擇要培養的從者清單
    const [selectedServants, setSelectedServants] = useState([]);
    
    const handleSelectServant = (servant) => {
        if(selectedServants.some(s => s.id === servant.id))
        {
            setSelectedServants(prev => prev.filter(s => s.id !== servant.id))
        }
        else
        {
            setSelectedServants(prev => [...prev, {
                ...servant,
                currentAscension: 0, targetAscension: 4,

                currentSkill1: 1, targetSkill1: 10,
                currentSkill2: 1, targetSkill2: 10,
                currentSkill3: 1, targetSkill3: 10,
                
                currentExtraSkill1: 1, targetExtraSkill1: 10,
                currentExtraSkill2: 1, targetExtraSkill2: 10,
                currentExtraSkill3: 1, targetExtraSkill3: 10,
                currentExtraSkill4: 1, targetExtraSkill4: 10,
                currentExtraSkill5: 1, targetExtraSkill5: 10,
            }]);
        }
    };

    // 功能：更新特定從者的技能等級
    const handleUpdateLevel = (id, field, value) => {
        setSelectedServants(prev => prev.map(s => 
            s.id === id ? { ...s, [field]: parseInt(value) } : s
        ));
    };
    const calculateResults = () => {
        const totalRequired = {};

        selectedServants.forEach(servant => {
            
            const current = servant.currentAscension;
            const target = servant.targetAscension;
            const neededAscensionStages = servant.ascension.slice(current, target);
            neededAscensionStages.forEach(stage => {
                Object.entries(stage).forEach(([matId, count]) => {
                    totalRequired[matId] = (totalRequired[matId] || 0) + count;
                });
            });

            [1,2,3].forEach(index => {
                const current = servant[`currentSkill${index}`];
                const target = servant[`targetSkill${index}`];
                const neededSkillStages = servant.skill.slice(current, target);
                neededSkillStages.forEach(stage => {
                    Object.entries(stage).forEach(([matId, count]) => {
                        totalRequired[matId] = (totalRequired[matId] || 0) + count;
                    });
                });
            });
            
            [1,2,3,4,5].forEach(index => {
                const current = servant[`currentExtraSkill${index}`];
                const target = servant[`targetExtraSkill${index}`];
                const neededSkillStages = servant.extra_skill.slice(current, target);
                neededSkillStages.forEach(stage => {
                    Object.entries(stage).forEach(([matId, count]) => {
                        totalRequired[matId] = (totalRequired[matId] || 0) + count;
                    });
                });
            });
        });

        return totalRequired;
    };
    const totalRequired = calculateResults();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8 px-4">

        {/* 區塊一：從者選擇區 */}
        <ServantList servants={mockServants} selectedServants={selectedServants} onSelectServant={handleSelectServant} />

        {/* 區塊二：調整區 */}
        <section className="lg:col-span-9">
            <h2 className='mb-4 text-lg font-bold tracking-wider uppercase dark:text-zinc-400 text-zinc-500'>2. 培養目標設定</h2>
            {selectedServants.length === 0 ? <p className="ml-4 text-sm text-gray-400 dark:text-gray-500">請先從上方選擇從者</p> : (
            <div className="space-y-4">
            {selectedServants.map(s => (
                <div key={s.id} className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <h3 className='mb-4 text-lg font-bold flex items-center gap-2'>{s.name}<span><img className='w-1/3' src={ClassImageMap[s.class]} alt="" /></span></h3>
                    <div className='flex gap-4 divide-x divide-gray-300'>
                    <div className='flex-1 p-4'>
                        <label>當前靈基等級: </label>
                        <select className='bg-white text-black border rounded-md' value={s.currentAscension} onChange={(e) => {handleUpdateLevel(s.id, 'currentAscension', e.target.value); handleUpdateLevel(s.id, 'targetAscension', Math.max(s.targetAscension, e.target.value))}}>
                            {[...Array(4).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                        </select>

                        <label style={{ marginLeft: '20px' }}>目標靈基等級: </label>
                        <select className='bg-white text-black border rounded-md' value={s.targetAscension} onChange={(e) => {handleUpdateLevel(s.id, 'targetAscension', e.target.value); handleUpdateLevel(s.id, 'currentAscension', Math.min(s.currentAscension, e.target.value))}}>
                            {[...Array(4).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                        </select>
                        {[1,2,3].map(index => <div key={index}>
                            <label>當前技能{index}等級: </label>
                            <select className='bg-white text-black border rounded-md' value={s[`currentSkill${index}`]} onChange={(e) => {handleUpdateLevel(s.id, `currentSkill${index}`, e.target.value); handleUpdateLevel(s.id, `targetSkill${index}`, Math.max(s[`targetSkill${index}`], e.target.value))}}>
                                {[...Array(10).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                            </select>

                            <label style={{ marginLeft: '20px' }}>目標技能{index}等級: </label>
                            <select className='bg-white text-black border rounded-md' value={s[`targetSkill${index}`]} onChange={(e) => {handleUpdateLevel(s.id, `targetSkill${index}`, e.target.value); handleUpdateLevel(s.id, `currentSkill${index}`, Math.min(s[`currentSkill${index}`], e.target.value))}}>
                                {[...Array(10).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                            </select>
                        </div>)}
                    </div>
                    <div className='flex-[1.2] p-4'>
                        {[1,2,3,4,5].map(index => <div key={index}>
                            <label>當前Extra技能{index}等級: </label>
                            <select className='bg-white text-black border rounded-md' value={s[`currentExtraSkill${index}`]} onChange={(e) => {handleUpdateLevel(s.id, `currentExtraSkill${index}`, e.target.value); handleUpdateLevel(s.id, `targetExtraSkill${index}`, Math.max(s[`targetExtraSkill${index}`], e.target.value))}}>
                                {[...Array(10).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                            </select>

                            <label style={{ marginLeft: '20px' }}>目標Extra技能{index}等級: </label>
                            <select className='bg-white text-black border rounded-md' value={s[`targetExtraSkill${index}`]} onChange={(e) => {handleUpdateLevel(s.id, `targetExtraSkill${index}`, e.target.value); handleUpdateLevel(s.id, `currentExtraSkill${index}`, Math.min(s[`currentExtraSkill${index}`], e.target.value))}}>
                                {[...Array(10).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                            </select>
                        </div>)}
                    </div>
                    </div>
                </div>
            ))}
            </div>
            )}
        </section>
        
        {/* 區塊三：最終計算結果 */}
        <section className="lg:col-span-12 rounded-2xl bg-blue-50/50 p-6 dark:bg-slate-800/40 border border-blue-100/50 dark:border-slate-700/50">
            <h2 className="mb-4 text-xl font-bold">📊 總消耗素材統計</h2>
            {Object.keys(totalRequired).length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">目前沒有素材需求，請調整上方的目標等級。</p>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {mockMaterials.map(m => {
                    const reqCount = totalRequired[m.id] || 0;

                    if (reqCount === 0) return null;

                    return (
                    <div 
                        key={m.id} 
                        className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-transform hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-800"
                    >
                        <span className="text-4xl">{m.icon}</span>
                        <span className="mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400">{m.name}</span>
                        <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 font-medium">
                        共需 <span className="text-xl font-black text-blue-600 dark:text-blue-400">{reqCount}</span> 個
                        </div>
                    </div>
                    );
                })}
                </div>
            )}
        </section>
        </div>
    );
}

export default FGOCalculator;