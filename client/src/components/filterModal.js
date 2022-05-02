import React from 'react';


const FilterModal = props => {

    const Category = [
        {
            value: 'business',
            name: 'Business'
        },
        {
            value: 'entertainment',
            name: 'Entertainment'
        },
        {
            value: 'general',
            name: 'General'
        },
        {
            value: 'health',
            name: 'Health'
        },
        {
            value: 'science',
            name: 'Science'
        },
        {
            value: 'sports',
            name: 'Sports'
        },
        {
            value: 'technology',
            name: 'Technology'
        }
    ]
    const Country = [
        {
            value: 'us',
            name: 'Usa'
        },
        {
            value: 'in',
            name: 'India'
        },
        {
            value: 'au',
            name: 'Australia'
        },
        {
            value: 'ca',
            name: 'Canada'
        },
        {
            value: 'ch',
            name: 'China'
        }
    ]
    return (
        <div className="filters">
            <span className="custom_dropdown">
                <select name="Category" id="Category"
                    value={props.selectedValueCategory}
                    onChange={props.handleChangeCategory}>
                    {
                        Category.map(o =>
                            (<option key={o.value} value={o.value}>{o.name}</option>
                            ))
                    }
                </select>
            </span>
            <span className="custom_dropdown">
                <select name="Country" id="Country"
                    value={props.selectedValueCountry}
                    onChange={props.handleChangeCountry}>
                    {
                        Country.map(o =>
                            (<option key={o.value} value={o.value}>{o.name}</option>
                            ))
                    }
                </select>
            </span>
        </div>
    )
}

export default FilterModal;