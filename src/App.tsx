import './App.css'
import jsonData from './data/characters.json'
import type {Character, CharacterAbility} from './types'
import MainTable from "./Components/Table/Table";
import Layout from "./Components/Layout/Layout";
import * as React from "react";
import {useCallback, useEffect} from "react";
import SearchBox from "./Components/SearchBox/SearchBox";
import SelectedChampions from "./Components/SelectedChampions/SelectedChampions";

const data: Character[] = jsonData as Character[]

function App() {
    const [selected, setSelected] = React.useState<number[]>([]);
    const [selectedData, setSelectedData] = React.useState<any>([]);
    const [searchInput, setSearchInput] = React.useState<string>('');
    const [filteredData, setFilteredData] = React.useState<Character[]>(data);
    const [currentDataLength, setCurrentDataLength] = React.useState<number>(20);
    // const [allTags, setAllTags] = React.useState<string[]>([]);

    const isBottom = (el: HTMLElement | null) => {
        if (el)
            return el.getBoundingClientRect().bottom <= window.innerHeight;
    }
    const trackScrolling = useCallback(() => {
        const wrappedElement = document.getElementById('tableContainer');
        if (isBottom(wrappedElement)) {
            document.removeEventListener('scroll', trackScrolling);
            loadMoreData();
            document.addEventListener('scroll', trackScrolling);
        }
    }, [])

    const loadMoreData = () => setCurrentDataLength(state => state + 10);

    const reducer = (acc: any, curr: CharacterAbility[]): any => {
        acc = {
            ...acc,
            power: [...acc.power, curr?.find(ability => ability.abilityName === 'Power')?.abilityScore],
            mobility: [...acc.mobility, curr?.find(ability => ability.abilityName === 'Mobility')?.abilityScore],
            energy: [...acc.energy, curr?.find(ability => ability.abilityName === 'Energy')?.abilityScore],
            survivability: [...acc.survivability, curr?.find(ability => ability.abilityName === 'Survivability')?.abilityScore],
            technique: [...acc.technique, curr?.find(ability => ability.abilityName === 'Technique')?.abilityScore]
        }
        return acc;
    }

    const handleSelected = (ids: number[]) => {
        setSelected(ids);
        const selectedChamps = data.filter(el => ids.includes(el.id));
        if (selectedChamps.length) {
            const champsAbilities = selectedChamps.map(champ => champ.abilities)
            let groupedAbilities = champsAbilities.reduce(reducer, {
                power: [],
                mobility: [],
                energy: [],
                survivability: [],
                technique: []
            });
            const selectedImages = selectedChamps.map(champ => champ.image);
            setSelectedData({abilities: groupedAbilities, images: selectedImages})
        } else setSelectedData({abilities: {}, images: []})
    }

    useEffect(() => {
        document.addEventListener('scroll', trackScrolling);
        return () => {
            document.removeEventListener('scroll', trackScrolling);
        }
    }, [trackScrolling]);

    useEffect(() => {
        // console.log(data.map(champ => champ.tags?.map(tag => tag.tag_name)))
        // flatten all tags, render on screen.
    }, [])

    useEffect(() => {
        // handle tag selected tags filtering before text.
        const filteredData = data.filter(el => el.name.toLowerCase().includes(searchInput.toLowerCase()));
        setFilteredData(filteredData);
        setCurrentDataLength(20);
    }, [searchInput])


    return (
        <Layout>
            <SelectedChampions data={selectedData}/>
            <div className="searchBoxContainer">
                <SearchBox searchInput={searchInput} setSearchInput={setSearchInput}/>
            </div>
            <div className='tableContainer' id='tableContainer'>
                <MainTable
                    data={filteredData.slice(0, currentDataLength)}
                    selected={selected}
                    setSelected={handleSelected}
                />
            </div>
        </Layout>
    )
}

export default App
