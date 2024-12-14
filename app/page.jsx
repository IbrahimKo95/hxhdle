"use client"
import React, {useEffect, useState} from "react";
import characters from "./data/newCharacters.json";
import Loader from "./components/Loader";
import { SendHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [triedCharacters, setTriedCharacters] = useState(null);
    const [choiceList, setChoiceList] = useState(null);
    const [win, setWin] = useState(false);
    const inputRef = React.useRef();

    useEffect(() => {
        setSelectedCharacter(characters[parseInt(String(Math.random() * characters.length))]);
        }, []);



    async function tryCharacter(e, selected) {
        e.preventDefault();
        if (selected) {
            setTriedCharacters(triedCharacters !== null ? [...triedCharacters, selected] : [selected]);
            setChoiceList(null);
            inputRef.current.value = "";
            if(selected.name === selectedCharacter.name) {
                setWin(true);
                window.scrollTo(0, document.body.scrollHeight)
            }
        } else {
            setTriedCharacters(triedCharacters !== null ? [...triedCharacters, choiceList[0]] : [choiceList[0]]);
            inputRef.current.value = "";
            if(choiceList[0].name === selectedCharacter.name) {
                setWin(true);
                window.scrollTo(0, document.body.scrollHeight)
            }
        }
    }

    async function searchCharacter(e) {
        if(e === "") {
            setChoiceList(null);
            return;
        }
        const search = e;
        const filteredCharacters = characters.filter((character) => {
            if (triedCharacters && triedCharacters.includes(character)) {
                return;
            }
            return character.name.toLowerCase().includes(search.toLowerCase());
        });
        setChoiceList(filteredCharacters);
    }

    return (
        <div className="flex flex-col items-center relative">
            <div>
                <div className="flex items-center justify-center mt-20">
                    {!selectedCharacter ? (
                        <Loader/>
                    ) : (
                        <div className="flex flex-col gap-y-3">
                            <div className="bg-gray-900 p-2 flex flex-col items-center gap-y-2">
                                <h2 className="font-semibold">Devine le personnage de Hunter x Hunter !</h2>
                                <p>Tape n'importe quel personnage pour commencer.</p>
                            </div>
                            {!win && (
                                <form onSubmit={(e) => (tryCharacter(e))}>
                                    <div className="relative flex gap-x-1 items-center ">
                                        <input placeholder="Tape le nom d'un personnage ..." ref={inputRef}
                                               onInput={(e) => (searchCharacter(e.target.value))} type="text"
                                               name="choice" className="w-80 text-black py-2 px-2"/>
                                        <button type={"submit"} className="bg-blue-500 h-full p-2">
                                            <SendHorizontal size={24}/>
                                        </button>
                                    </div>
                                    <div className="bg-gray-900 flex flex-col w-full max-h-52 overflow-y-scroll">
                                        {choiceList && choiceList.map((character) => (
                                            <button onClick={(e) => (tryCharacter(e, character))} key={character.name}
                                                    className="flex items-center gap-x-5 py-2 px-5 hover:bg-gray-800">
                                                <img className="w-10 h-10 object-cover" src={character.icon}
                                                     alt={character.name}/>
                                                <div>{character.name}</div>
                                            </button>
                                        ))}
                                    </div>
                                </form>
                            )}
                        </div>

                    )}
                </div>
            </div>


            <div className="flex flex-col w-2/4 mt-20 gap-y-5 items-center mb-20 max-md:overflow-x-scroll max-md:w-full">
                {triedCharacters && (
                    <div className="flex justify-center gap-x-5 items-center py-2 px-2 h-20 ">
                        <div className="h-20 w-20 flex items-end justify-center p-2 text-center border-b-[1px] text-sm">
                            <p className="bg-gray-900/5 text-sm">Personnage</p>
                        </div>
                        <div
                            className={`border-b-[1px] h-20 w-20 flex items-end justify-center p-2 text-center`}>
                            <p className="bg-gray-900/5 text-sm ">Genre</p>
                        </div>
                        <div
                            className={`border-b-[1px] h-20 w-20 flex items-end justify-center p-2 text-center`}>
                            <p className="bg-gray-900/5 text-sm">Espèce</p>
                        </div>
                        <div
                            className={`border-b-[1px] h-20 w-20 flex items-end justify-center p-2 text-center`}>
                            <p className="bg-gray-900/5 text-sm">Affiliations</p>
                        </div>
                        <div
                            className={`border-b-[1px] h-20 w-20 flex items-end justify-center p-2 text-center`}>
                            <p className="bg-gray-900/5 text-sm">Occupations</p>
                        </div>
                        <div
                            className={`border-b-[1px] h-20 w-20 flex items-end justify-center p-2 text-center`}>
                            <p className="bg-gray-900/5 text-xs">Type de nen</p>
                        </div>
                        <div
                            className={`border-b-[1px] h-20 w-20 flex items-end justify-center p-2 text-center`}>
                            <p className="bg-gray-900/5 text-xs">Arc d'apparition</p>
                        </div>
                    </div>

                )}
                {triedCharacters && triedCharacters.map((character, index) => (
                    <div key={character.name} className="flex justify-center gap-x-5 items-center py-2 px-2 h-20">
                    <div
                            className="h-20 w-20 flex items-center justify-center text-center border-[1px] text-sm overflow-hidden group">
                            <img className="object-cover w-full h-full" src={character.icon} alt={character.name}/>
                            <p className="w-14 opacity-0 absolute group-hover:opacity-100 bg-gray-900 text-xs p-1">{character.name}</p>
                        </div>
                        <motion.div
                            className={`border-[1px] h-20 w-20 flex items-center justify-center p-1 text-center ${character.gender === selectedCharacter.gender ? "bg-green-500" : "bg-red-500"}`}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                delay: (1) * 0.2,
                                duration: 0.5,
                            }}>
                            <p className={`${character.gender.length > 10 ? 'text-xs' : 'text-sm'}`}>{character.gender}</p>
                        </motion.div>
                        <motion.div
                            className={`border-[1px] h-20 w-20 flex items-center justify-center p-1 text-center ${character.species === selectedCharacter.species ? "bg-green-500" : "bg-red-500"}`}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                delay: (4) * 0.2,
                                duration: 0.5,
                            }}>
                            <p className={`${character.species.length > 10 ? 'text-xs' : 'text-sm'}`}>{character.species}</p>
                        </motion.div>
                        <motion.div
                            className={`border-[1px] h-20 w-20 flex items-center justify-center p-1 text-center ${character.affiliations.length === selectedCharacter.affiliations.length && character.affiliations.every(r => selectedCharacter.affiliations.includes(r)) ? "bg-green-500" : character.affiliations.some(r => selectedCharacter.affiliations.includes(r)) ? "bg-orange-500" : "bg-red-500"}`}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                delay: (7) * 0.2,
                                duration: 0.5,
                            }}>
                            <p className={`text-xs`}>{character.affiliations.join(', ')}</p>
                        </motion.div>
                        <motion.div
                            className={`border-[1px] h-20 w-20 flex items-center justify-center p-1 text-center ${character.occupations.length === selectedCharacter.occupations.length && character.occupations.every(r => selectedCharacter.occupations.includes(r)) ? "bg-green-500" : character.occupations.some(r => selectedCharacter.occupations.includes(r)) ? "bg-orange-500" : "bg-red-500"}`}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                delay: (10) * 0.2,
                                duration: 0.5,
                            }}>
                            <p className={`text-xs`}>{character.occupations.join(', ')}</p>
                        </motion.div>
                        <motion.div
                            className={`border-[1px] h-20 w-20 flex items-center justify-center p-1 text-center ${character.nen_type === selectedCharacter.nen_type ? "bg-green-500" : "bg-red-500"}`}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                delay: (13) * 0.2,
                                duration: 0.5,
                            }}>
                            <p className={`${character.nen_type.length > 10 ? 'text-xs' : 'text-sm'}`}>{character.nen_type}</p>
                        </motion.div>
                        <motion.div
                            className={`border-[1px] h-20 w-20 flex items-center justify-center p-1 text-center ${character.arc === selectedCharacter.arc ? "bg-green-500" : "bg-red-500"}`}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                delay: (16) * 0.2,
                                duration: 0.5,
                            }}>
                            <p className={`${character.arc.length > 10 ? 'text-xs' : 'text-sm'}`}>{character.arc}</p>
                        </motion.div>
                    </div>
                ))}
                {
                    win && (
                        <div
                            className="border-[1px] border-green-500 bg-green-700 py-5 flex flex-col items-center gap-y-2 w-2/4 mt-10">
                            <h2 className="font-bold mb-3 text-xl">Bravo !</h2>
                            <div className="flex items-center gap-x-5">
                                <img className="cover w-20 h-20 object-cover border-[1px]" src={selectedCharacter.icon}
                                     alt={selectedCharacter.name}/>
                                <div className="text-center">
                                    <p>Tu as trouvé</p>
                                    <p className="font-bold text-lg">{selectedCharacter.name}</p>
                                </div>
                            </div>
                            <p className="mt-5">Nombre d'essais : {triedCharacters.length}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
