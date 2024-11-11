"use client"
import {useEffect, useState} from "react";
import characters from "./data/characters.json";

export default function Home() {
    const [selectedcharacter, setSelectedCharacter] = useState(null);
    const [triedCharacters, setTriedCharacters] = useState(null);
    const [choiceList, setChoiceList] = useState(null);
    useEffect(() => {
        setSelectedCharacter(characters[parseInt(String(Math.random() * characters.length))]);
        }, []);

    async function tryCharacter(e) {
        e.preventDefault();
        setTriedCharacters(triedCharacters !== null ? [...triedCharacters, choiceList[0]] : [choiceList[0]]);
        setChoiceList(null);
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
        <div>
            {selectedcharacter && (
                <div key={selectedcharacter.name}>
                    <h1>{selectedcharacter.name}</h1>
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
                                <button key={character.name} className="flex justify-between py-2 px-2">
                                    <div>{character.name}</div>
                                </button>
                            ))}
                        </div>
                    </form>
                </div>
            </div>

            <div>
                {triedCharacters && triedCharacters.map((character) => (
                    <button key={character.name} className="flex justify-between py-2 px-2">
                        <div>{character.name}</div>
                    </button>
                ))}
            </div>

        </div>
    )
}
