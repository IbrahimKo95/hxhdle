"use client"
import {useEffect, useState} from "react";
import characters from "./data/characters.json";

export default function Home() {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [triedCharacters, setTriedCharacters] = useState(null);
    const [choiceList, setChoiceList] = useState(null);
    useEffect(() => {
        setSelectedCharacter(characters[parseInt(String(Math.random() * characters.length))]);
        }, []);

    async function tryCharacter(e, selected) {
        e.preventDefault();
        if (selected) {
            setTriedCharacters(triedCharacters !== null ? [...triedCharacters, selected] : [selected]);
            setChoiceList(null);
        } else {
            setTriedCharacters(triedCharacters !== null ? [...triedCharacters, choiceList[0]] : [choiceList[0]]);
            setChoiceList(null);
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
                            <input onInput={(e) => (searchCharacter(e.target.value))} type="text" name="choice" className="w-80 text-black py-2 px-2"/>
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

            <div className="flex flex-col gap-y-3 w-2/4">
                {triedCharacters && triedCharacters.map((character) => (
                    <div key={character.name} className="flex justify-between py-2 px-2">
                        <div>
                            <p>{character.name}</p>
                        </div>
                        <div className={character.gender === selectedCharacter.gender ? "bg-green-500" : "bg-red-500"}>
                            <p>{character.gender}</p>
                        </div>
                        <div className={character.species === selectedCharacter.species ? "bg-green-500" : "bg-red-500"}>
                            <p>{character.species}</p>
                        </div>
                        <div className={character.affiliations === selectedCharacter.affiliations ? "bg-green-500" : "bg-red-500"}>
                            <p>{character.affiliations}</p>
                        </div>
                        <div className={character.nen_type === selectedCharacter.nen_type ? "bg-green-500" : "bg-red-500"}>
                            <p>{character.nen_type}</p>
                        </div>
                        <div className={character.arc === selectedCharacter.arc ? "bg-green-500" : "bg-red-500"}>
                            <p>{character.arc}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
