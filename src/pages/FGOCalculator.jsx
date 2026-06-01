import ServantList from '@/components/ServantList';
import { useState } from 'react';
import Lancer from '@/assets/Lancer.png'
import Ruler from '@/assets/Ruler.png'
import { materials } from '@/data/materials';
import { servants } from '@/data/servants';

const ClassImageMap = {
    'Lancer': Lancer,
    'Ruler': Ruler,
}



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
                isSkipAscension: false, currentAscension: 0, targetAscension: 4,

                isSkipSkill1: false, currentSkill1: 1, targetSkill1: 10,
                isSkipSkill2: false, currentSkill2: 1, targetSkill2: 10,
                isSkipSkill3: false, currentSkill3: 1, targetSkill3: 10,
                
                isSkipExtraSkill1: false, currentExtraSkill1: 1, targetExtraSkill1: 10,
                isSkipExtraSkill2: false, currentExtraSkill2: 1, targetExtraSkill2: 10,
                isSkipExtraSkill3: false, currentExtraSkill3: 1, targetExtraSkill3: 10,
                isSkipExtraSkill4: false, currentExtraSkill4: 1, targetExtraSkill4: 10,
                isSkipExtraSkill5: false, currentExtraSkill5: 1, targetExtraSkill5: 10,
            }]);
        }
    };

    // 功能：更新特定從者的技能等級
    const handleUpdateLevel = (id, field, value) => {
        setSelectedServants(prev => prev.map(s => 
            s.id === id ? { ...s, [field]: value } : s
        ));
    };
    const calculateResults = () => {
        const totalRequired = {};

        selectedServants.forEach(servant => {
            
            if(!servant.isSkipAscension) {
                const current = servant.currentAscension;
                const target = servant.targetAscension;
                const neededAscensionStages = servant.ascension.slice(current, target);
                neededAscensionStages.forEach(stage => {
                    Object.entries(stage).forEach(([matId, count]) => {
                        totalRequired[matId] = (totalRequired[matId] || 0) + count;
                    });
                });
            }

            [1,2,3].forEach(index => {
                if(servant[`isSkipSkill${index}`]) return;
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
                if(servant[`isSkipExtraSkill${index}`]) return;
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
        <ServantList servants={servants} selectedServants={selectedServants} onSelectServant={handleSelectServant} />

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
                        <label><input type="checkbox" checked={s.isSkipAscension} onChange={e => handleUpdateLevel(s.id, 'isSkipAscension', !s.isSkipAscension)} />
                        略過 </label>
                        <label>靈基: 當前等級 </label>
                        <select className='bg-white text-black border rounded-md' value={s.currentAscension} onChange={(e) => {handleUpdateLevel(s.id, 'currentAscension', e.target.value); handleUpdateLevel(s.id, 'targetAscension', Math.max(s.targetAscension, e.target.value))}}>
                            {[...Array(5).keys()].map(i => <option key={i} value={i}>{i}</option>)}
                        </select>

                        <label style={{ marginLeft: '20px' }}>目標等級 </label>
                        <select className='bg-white text-black border rounded-md' value={s.targetAscension} onChange={(e) => {handleUpdateLevel(s.id, 'targetAscension', e.target.value); handleUpdateLevel(s.id, 'currentAscension', Math.min(s.currentAscension, e.target.value))}}>
                            {[...Array(5).keys()].map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                        {[1,2,3].map(index => <div key={index}>
                            <label><input type="checkbox" checked={s[`isSkipSkill${index}`]} onChange={e => handleUpdateLevel(s.id, `isSkipSkill${index}`, !s[`isSkipSkill${index}`])} />
                            略過 </label>
                            <label>技能{index}: 當前等級 </label>
                            <select className='bg-white text-black border rounded-md' value={s[`currentSkill${index}`]} onChange={(e) => {handleUpdateLevel(s.id, `currentSkill${index}`, e.target.value); handleUpdateLevel(s.id, `targetSkill${index}`, Math.max(s[`targetSkill${index}`], e.target.value))}}>
                                {[...Array(10).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                            </select>

                            <label style={{ marginLeft: '20px' }}>目標等級 </label>
                            <select className='bg-white text-black border rounded-md' value={s[`targetSkill${index}`]} onChange={(e) => {handleUpdateLevel(s.id, `targetSkill${index}`, e.target.value); handleUpdateLevel(s.id, `currentSkill${index}`, Math.min(s[`currentSkill${index}`], e.target.value))}}>
                                {[...Array(10).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                            </select>
                        </div>)}
                    </div>
                    <div className='flex-[1.2] p-4'>
                        {[1,2,3,4,5].map(index => <div key={index}>
                            <label><input type="checkbox" checked={s[`isSkipExtraSkill${index}`]} onChange={e => handleUpdateLevel(s.id, `isSkipExtraSkill${index}`, !s[`isSkipExtraSkill${index}`])} />
                            略過 </label>
                            <label>Extra技能{index}: 當前等級 </label>
                            <select className='bg-white text-black border rounded-md' value={s[`currentExtraSkill${index}`]} onChange={(e) => {handleUpdateLevel(s.id, `currentExtraSkill${index}`, e.target.value); handleUpdateLevel(s.id, `targetExtraSkill${index}`, Math.max(s[`targetExtraSkill${index}`], e.target.value))}}>
                                {[...Array(10).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                            </select>

                            <label style={{ marginLeft: '20px' }}>目標等級 </label>
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
            <h2 className="mb-4 text-xl font-bold">素材計算結果</h2>
            {Object.keys(totalRequired).length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">目前沒有素材需求，請調整上方的目標等級。</p>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {materials.map(m => {
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