"use client"
import React, {useEffect, useState} from "react";
import characters from "./data/characters.json";

export default function Home() {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [triedCharacters, setTriedCharacters] = useState(null);
    const [choiceList, setChoiceList] = useState(null);
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
        } else {
            setTriedCharacters(triedCharacters !== null ? [...triedCharacters, choiceList[0]] : [choiceList[0]]);
            inputRef.current.value = "";
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
        <div className="flex flex-col items-center">
            {selectedCharacter && (
                <div key={selectedCharacter.name}>
                    <h1>{selectedCharacter.name}</h1>
                </div>
            )}

            <div>
                <div className="flex items-center justify-center">
                    <form onSubmit={(e) => (tryCharacter(e))}>
                        <div className="relativve">
                            <input ref={inputRef} onInput={(e) => (searchCharacter(e.target.value))} type="text" name="choice" className="w-80 text-black py-2 px-2"/>
                        </div>
                        <div className="bg-gray-900 flex flex-col w-full max-h-52 overflow-y-scroll">
                            {choiceList && choiceList.map((character) => (
                                <button onClick={(e) => (tryCharacter(e, character))} key={character.name} className="flex justify-between py-2 px-2">
                                    <div>{character.name}</div>
                                </button>
                            ))}
                        </div>
                    </form>
                </div>
            </div>

            <div className="flex flex-col w-2/4 mt-20 gap-y-5">
                {triedCharacters && triedCharacters.map((character) => (
                    <div key={character.name} className="flex justify-center gap-x-5 items-center py-2 px-2 h-20">
                        <div className="h-20 w-20 flex items-center justify-center p-2 text-center border-[1px] text-sm">
                            <p>{character.name}</p>
                        </div>
                        <div
                            className={`border-[1px] h-20 w-20 flex items-center justify-center p-2 text-center ${character.gender === selectedCharacter.gender ? "bg-green-500" : "bg-red-500"}`}>
                            <p className={`${character.gender.length > 10 ? 'text-xs' : 'text-sm'}`}>{character.gender}</p>
                        </div>
                        <div
                            className={`border-[1px] h-20 w-20 flex items-center justify-center p-2 text-center ${character.species === selectedCharacter.species ? "bg-green-500" : "bg-red-500"}`}>
                            <p className={`${character.species.length > 10 ? 'text-xs' : 'text-sm'}`}>{character.species}</p>
                        </div>
                        <div
                            className={`border-[1px] h-20 w-20 flex items-center justify-center p-2 text-center ${character.affiliations === selectedCharacter.affiliations ? "bg-green-500" : character.affiliations.some(r=> selectedCharacter.affiliations.includes(r)) ? "bg-orange-500" : "bg-red-500"}`}>
                            <p className={`${character.affiliations.length > 10 ? 'text-xs' : 'text-sm'}`}>{character.affiliations.join(', ')}</p>
                        </div>
                        <div
                            className={`border-[1px] h-20 w-20 flex items-center justify-center p-2 text-center ${character.nen_type === selectedCharacter.nen_type ? "bg-green-500" : "bg-red-500"}`}>
                            <p className={`${character.nen_type.length > 10 ? 'text-xs' : 'text-sm'}`}>{character.nen_type}</p>
                        </div>
                        <div
                            className={`border-[1px] h-20 w-20 flex items-center justify-center p-2 text-center ${character.arc === selectedCharacter.arc ? "bg-green-500" : "bg-red-500"}`}>
                            <p className={`${character.arc.length > 10 ? 'text-xs' : 'text-sm'}`}>{character.arc}</p>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}
