import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Trash2, Plus } from 'lucide-react';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");

    // Gravity Effect: Sinks tasks over time
    useEffect(() => {
        const interval = setInterval(() => {
            setTasks(prev => prev.map(t => ({
                ...t,
                altitude: Math.max(0, t.altitude - 1) // Tasks slowly lose altitude
            })));
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const addTask = () => {
        if (!input) return;
        const newTask = {
            id: Date.now(),
            text: input,
            altitude: 100, // Starts at 100% height
            priority: Math.random() > 0.5 ? 'High' : 'Low'
        };
        setTasks([...tasks, newTask]);
        setInput("");
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-slate-200 p-8 font-sans">
            <div className="max-w-md mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-black tracking-tighter text-white">NEWTON'S DEBT</h1>
                    <p className="text-slate-500 text-sm italic">Defy the pull of procrastination.</p>
                </header>

                <div className="flex gap-2 mb-10 bg-[#16161a] p-2 rounded-xl border border-white/5">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-transparent flex-1 px-4 outline-none"
                        placeholder="Launch a task..."
                    />
                    <button onClick={addTask} className="bg-indigo-600 p-3 rounded-lg hover:bg-indigo-500 transition">
                        <Plus size={20} />
                    </button>
                </div>

                <div className="relative h-[500px] border-l border-white/5">
                    <AnimatePresence>
                        {tasks.map((task) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0, y: 100 - task.altitude }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute w-full flex items-center justify-between bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/10 mb-4"
                            >
                                <div className="flex items-center gap-3">
                                    <Rocket size={16} className={task.altitude > 50 ? "text-cyan-400" : "text-red-500"} />
                                    <span>{task.text}</span>
                                </div>
                                <button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}>
                                    <Trash2 size={16} className="text-slate-600 hover:text-red-400" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default App;