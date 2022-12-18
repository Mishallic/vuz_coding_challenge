import './SelectedChampions.style.css'

const SelectedChampions = ({data}: any) => {
    const {images, abilities} = data;
    const renderImages = images?.map((src: string, i: number) =>
        <div className='imageContainer' key={i}>
            <img className='image' src={src} alt='SCI'/>
        </div>
    )

    const average = (array: number[]) => array.reduce((a, b) => a + b) / array.length;
    const renderAbilities = abilities && Object.keys(abilities).map(ability => {
        return (
            <div className='abilityContainer' key={ability}>
                <div className="abilityName">{ability}</div>
                <div className="abilityScore">{Math.round(average(abilities[ability]) * 10) / 10}</div>
            </div>
        )
    })
    return (
        <div className='root'>
            <div className='text'>
                <b>Your champions!</b>
            </div>
            <div className="imagesContainer">
                {renderImages}
            </div>
            <div className="abilitiesContainer">
                {renderAbilities}
            </div>

            <p style={{marginLeft: '25%', fontSize: 12}}>*Total as average for squad</p>
        </div>
    )
}

export default SelectedChampions;