const Tag = (name: string, selected = false) => {
    return (
        <div style={{
            borderRadius: '25%',
            border: '1px solid blue',
            background: selected ? 'blue' : 'none',
            color: selected ? 'white' : 'blue'
        }}>
            {name}
        </div>
    )
}

export default Tag