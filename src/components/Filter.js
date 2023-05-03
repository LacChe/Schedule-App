import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useStateContext } from '../utils/stateContext';
import { urlFor } from '../utils/client';
import { CgEditFlipH } from 'react-icons/cg';

const Filter = ({ setDisplay }) => {
    const { categories, systemCategories, taskTypes, idFilters, setIdFilters,iconData } = useStateContext();

    const toggleFilter = () => {
        if(idFilters.length === 0){
            setIdFilters(taskTypes.concat(categories.concat(systemCategories)).map((item) => item._id))
        } else {
            setIdFilters([])
        }
    }

    const handleSelect = (id) => {
        if(idFilters.includes(id)){
            setIdFilters((prev) => prev.filter((item) => item !== id));
        } else {
            setIdFilters((prev) => [id].concat(prev));
        }
    }

  return (
    <div className='filter-main'>
        <h1>Filter by</h1>
        <h1>Task and Category</h1>
        <div className='filter-item-list'>
            <h1>Tasks</h1>
            {taskTypes?.length === 0 ? 
                <div className='empty'>Empty</div> : taskTypes?.map((item) =>
                    <button onClick={()=>handleSelect(item._id)} 
                        className={idFilters.includes(item._id) ? 'item-bubble-inner filtered' : 'item-bubble-inner'}
                        style={{'backgroundColor' : categories?.concat(systemCategories)?.filter(
                                (cat) => cat?._id === item.category?._ref
                            )[0]?.color.hex}}
                        key={item._id} type='button'
                    >
                        <img className='icon-image' 
                            src={urlFor(iconData?.filter(
                                    (icon)=> item?.icon?._ref===icon?._id
                                )[0]?.image?.asset?._ref)} 
                            alt='loading' 
                        />
                        <p>{item.name} ({item.unit})</p>
                    </button>
            )}
        </div>
        <div className='filter-item-list'>
            <h1>Categories</h1>
            {categories.concat(systemCategories)?.map((item) => 
                <button onClick={()=>handleSelect(item._id)} 
                    className={idFilters.includes(item._id) ? 'item-bubble-inner filtered' : 'item-bubble-inner'} 
                    style={{'backgroundColor' : `${item?.color?.hex}`}} 
                    key={item._id} type='button'
                >
                    <img className='icon-image' 
                        src={urlFor(iconData?.filter((icon)=> item?.icon?._ref===icon?._id)[0]?.image?.asset?._ref)} 
                        alt='loading' 
                    />
                    <p>{item.name}</p>
                </button>
            )}
        </div>
        <button className='button-tool-toggle-filter' type='button' onClick={toggleFilter}>
            <CgEditFlipH />
        </button>
        <button className='button-tool-confirm' type='button' onClick={()=>setDisplay('')}>
            <AiOutlineCheckCircle />
        </button>
    </div>
  )
}

export default Filter