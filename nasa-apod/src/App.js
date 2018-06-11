import React, { Component } from 'react';
import ViewerTemplate from './components/ViewerTemplate';
import SpaceNavigator from './components/SpaceNavigator';
import Viewer from './components/Viewer';
import moment from 'moment';
import * as api from './lib/api';

class App extends Component {

  state = {
    loading: false,
    maxDate: null, // 이건 뭐지??? api에서 오늘 이후에 date는 존재하지 않기에 이걸 설정해둔다.
    date: null,
    urL: null,
    mediaType: null
  }

  getAPOD = async (date) => {
    if (this.state.loading) return; // 이미 요청중이라면 무시.
    this.setState({
      loading: true
    })
    // api.getAPOD(date).then(response => {
    //   console.log(response);
    // })
    try {
      const response = await api.getAPOD(date);
      const { date: retrievedDate, url , media_type: mediaType } = response.data;
      //console.log(response);
      if(!this.state.maxDate) {
        this.setState({
          maxDate: retrievedDate
        })
      }

      this.setState({
        date:retrievedDate,
        mediaType,
        url
      })
    } catch (e) {
      console.log(e);
    }

    this.setState({
      loading: false
    })
  }

  componentDidMount() {
    this.getAPOD();
  }

  handleNext = () => {
    // 다음날껄 불러와야한다.
    console.log(this);
    const { date, maxDate } = this.state;

    if( date === maxDate) return;

    const nextDate = moment(date).add(1, 'days').format('YYYY-MM-DD');
    this.getAPOD(nextDate);
  }

  handlePrev = () => {
    // 이전날껄 불러와야 한다.
    const { date } = this.state;

    const prevDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
    this.getAPOD(prevDate);
  }

  render() {
    const {url, mediaType, loading} = this.state;
    const {handleNext , handlePrev} = this;
    return (
      
        <ViewerTemplate
          spaceNavigator={<SpaceNavigator onPrev={handlePrev} onNext={handleNext}/>}  
          viewer={(
            <Viewer
              url={url}
              mediaType={mediaType}
              loading={loading}
            />
          )}
        />

      
    );
  }
}

export default App;
