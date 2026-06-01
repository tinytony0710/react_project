import Lancer from '@/assets/Lancer.png'
import Ruler from '@/assets/Ruler.png'

const ClassImageMap = {
    'Lancer': Lancer,
    'Ruler': Ruler,
}

function CharacterCard({ servant, onSelectServant, isSelected }) {
    return (
        <div
            onClick={() => onSelectServant(servant)}
            className={`p-3 pb-8 rounded-xl cursor-pointer transition-all border ${
            (isSelected)
                ? "dark:bg-indigo-950/40 bg-indigo-50 dark:border-indigo-500/50 border-indigo-400 shadow-md ring-1 ring-indigo-500/30"
                : "dark:bg-zinc-900/60 bg-white dark:border-zinc-800 border-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-700"
            }`}
        >
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-base flex items-center gap-1.5 dark:text-zinc-100 text-zinc-900">
                    No.{servant.id} <span><img className='w-1/3' src={ClassImageMap[servant.class]} alt="" /></span>{servant.name}
                </h3>
            </div>
        </div>
    )
}

function ServantList({ servants, selectedServants, onSelectServant, }) {
    return (
        <section className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-lg font-bold tracking-wider uppercase dark:text-zinc-400 text-zinc-500">
                    1. 選擇從者 ({servants.length})
                </h2>
            </div>
        
            <div className="space-y-2 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
                {servants.map(servant => <CharacterCard key={servant.id} servant={servant} onSelectServant={onSelectServant} isSelected={selectedServants.some(s => s.id === servant.id)} />)}
            </div>
        </section>
    );
}

export default ServantList;