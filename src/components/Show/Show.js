import React, { Component } from 'react';
import {getShowInfo} from '../../api';

export default class Show extends Component{
  state={
    showId: ``,
    data: null
  };
  static getDerivedStateFromProps(props, state){
    return props.showId !== state.showId
    ? { showId: props.showId}
    : null;
  }


  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.showId !== prevState.showId ){
      const res = await getShowInfo(this.props.showId);
      this.setState({
        data: res
      });
    }
  }

  render() {
    if(!this.state.data){
      return <div>Выбирите фильм!</div>
    }
    const {name, image:{medium}} = this.state.data;

    return(
      <div className="radio">
        <input id="house" className="radio-input t-radio-input-house" type="radio" name="show" value="house" />
        <label htmlFor="house" className="radio-label">
          <img className="radio-image" src={medium} alt="House M.D." />
          <span className="radio-label">{name}</span>
        </label>
      </div>
    )

  }
}