import React, { Component } from 'react';
import '../css/conditionbar.css';
import SearchingInput from './searchingInput';
import FilterModal from './filterModal';

let lastScrollY = 0;

class ConditionBar extends Component {

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('scroll', this.handleScroll);
    }
    header = React.createRef();
    filter = React.createRef();
    handleResize = () => {
        if (window.innerWidth < 630) {
            this.filter.current.style.display = 'none';
        }
        else {
            this.filter.current.style.display = 'unset';
        }
    }
    handleScroll = () => {
        lastScrollY = window.scrollY;

        if (lastScrollY > 80 && window.innerWidth < 630) {
            this.header.current.style.transform = "translateY(-110%)";
            this.header.current.style.opacity = "0";
        }
        else {
            this.header.current.style.transform = "translateY(0%)";
            this.header.current.style.opacity = "1";
        }
    };

    render() {
        return (
            <div ref={this.header} className="condition-bar">
                    <SearchingInput value={this.props.value} handleChange={this.props.handleChange} />
                    <div ref={this.filter} className="topheaderFilter">
                        <FilterModal
                            selectedValueCountry={this.props.selectedValueCountry}
                            handleChangeCountry={this.props.handleChangeCountry}
                            selectedValueCategory={this.props.selectedValueCategory}
                            handleChangeCategory={this.props.handleCategoryChange} />

                    </div>
                </div>

        );
    }
}

export default ConditionBar;