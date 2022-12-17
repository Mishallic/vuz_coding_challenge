import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import type {AbilityName, Character, CharacterAbility, CharacterTag} from '../../types'
import {Dispatch} from "react";


interface HeadCell {
    disablePadding: boolean;
    id: keyof Character;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Character',
    },
    {
        id: 'tags',
        numeric: true,
        disablePadding: false,
        label: 'Tags',
    },
    {
        id: 'abilities',
        numeric: true,
        disablePadding: false,
        label: 'Power',
    },
    {
        id: 'abilities',
        numeric: true,
        disablePadding: false,
        label: 'Mobility',
    },
    {
        id: 'abilities',
        numeric: true,
        disablePadding: false,
        label: 'Technique',
    },
    {
        id: 'abilities',
        numeric: true,
        disablePadding: false,
        label: 'Survivability',
    },
    {
        id: 'abilities',
        numeric: true,
        disablePadding: false,
        label: 'Energy',
    },
];

function MainTableHead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id + headCell.label}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

type mainTableProps = {
    data: Character[],
    selected: number[],
    setSelected: Dispatch<number[]>
}
const MainTable = ({data, selected, setSelected}: mainTableProps) => {

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const getTags = (tags: CharacterTag[]) => {
        if (tags)
            return tags.map(el => el.tag_name).join(',');
    }
    const getAbility = (abilities: CharacterAbility[], abilityName: AbilityName) => {
        if (abilities)
            return abilities.find(el => el.abilityName === abilityName)?.abilityScore
    }

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                    >
                        <MainTableHead/>
                        <TableBody>
                            {data.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.name}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{getTags(row.tags)}</TableCell>
                                        <TableCell align="right">{getAbility(row.abilities, 'Power')}</TableCell>
                                        <TableCell align="right">{getAbility(row.abilities, 'Mobility')}</TableCell>
                                        <TableCell align="right">{getAbility(row.abilities, 'Technique')}</TableCell>
                                        <TableCell
                                            align="right">{getAbility(row.abilities, 'Survivability')}</TableCell>
                                        <TableCell align="right">{getAbility(row.abilities, 'Energy')}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

export default MainTable;