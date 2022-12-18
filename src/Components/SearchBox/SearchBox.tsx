import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {Dispatch} from "react";

type SearchBoxProps = {
    searchInput: string,
    setSearchInput: Dispatch<string>
}
const SearchBox = ({searchInput, setSearchInput}: SearchBoxProps) => {
    const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const target = e.target as HTMLTextAreaElement;
        setSearchInput(target.value);
    }
    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
        >
            <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                <SearchIcon/>
            </IconButton>
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Search Characters"
                value={searchInput}
                onChange={handleInputChange}
            />
        </Paper>
    );
}

export default SearchBox;