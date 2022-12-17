import './App.css'
import jsonData from './data/characters.json'
import type {Character} from './types'
import MainTable from "./Components/Table/Table";
import Layout from "./Components/Layout/Layout";
import * as React from "react";
import {useEffect} from "react";
import SearchBox from "./Components/SearchBox/SearchBox";

const data: Character[] = jsonData as Character[]

function App() {
    const [selected, setSelected] = React.useState<number[]>([]);
    const [searchInput, setSearchInput] = React.useState<string>('');
    const [filteredData, setFilteredData] = React.useState<Character[]>(data);
    const [currentDataLength, setCurrentDataLength] = React.useState<number>(20);

    const isBottom = (el: HTMLElement | null) => {
        if (el)
            return el.getBoundingClientRect().bottom <= window.innerHeight;
    }
    const trackScrolling = () => {
        const wrappedElement = document.getElementById('tableContainer');
        if (isBottom(wrappedElement)) {
            document.removeEventListener('scroll', trackScrolling);
            loadMoreData();
        }
    };

    const loadMoreData = () => {
        setCurrentDataLength(state => state + 10);
        document.addEventListener('scroll', trackScrolling);
    }

    useEffect(() => {
        document.addEventListener('scroll', trackScrolling);
        return () => {
            document.removeEventListener('scroll', trackScrolling);
        }
    }, [])

    useEffect(() => {
        const filteredData = data.filter(el => el.name.toLowerCase().includes(searchInput) || (el?.tags?.map(tag => tag.tag_name).some(el => el.includes(searchInput))));
        setFilteredData(filteredData);
        setCurrentDataLength(20);
    }, [searchInput])


    return (
        <Layout>
            <div className="searchBoxContainer">
                <SearchBox searchInput={searchInput} setSearchInput={setSearchInput}/>
            </div>
            <div className='tableContainer' id='tableContainer'>
                <MainTable
                    data={filteredData.slice(0, currentDataLength)}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
        </Layout>
    )
}

export default App
