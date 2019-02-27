import React from 'react';
import './calendar.less';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      year: null,
      month: null,
      activeDate: null
    }
    this.preYearHandler = this.preYearHandler.bind(this);
    this.preMonthHandler = this.preMonthHandler.bind(this);
    this.nextMonthHandler = this.nextMonthHandler.bind(this);
    this.nextYearHandler = this.nextYearHandler.bind(this);
  }

  componentDidMount(){
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const activeDate = now.toDateString();
    this.setState({
      year,
      month,
      activeDate,
    });
  }

  preYearHandler() {
    this.setState( prevState => {
      return {
        year: prevState.year - 1
      };
    })
  }

  nextYearHandler() {
    this.setState( prevState => {
      return{
        year: prevState.year + 1
      };
    })
  }

  preMonthHandler() {
    this.setState( prevState => {
      if(prevState.month === 1){
        return {
          month: 12,
          year: prevState.year - 1
        }
      }
      return {
        month: prevState.month - 1
      }
    })
  }

  nextMonthHandler() {
    this.setState( prevState => {
      if(prevState.month === 12){
        return {
          month: 1,
          year: prevState.year + 1
        }
      }
      return {
        month: prevState.month + 1
      }
    })
  }

  render() {
    let dateList = [];
    const { year, month, activeDate } = this.state;
    const { width, height } = this.props;
    const lineHeight = height / 8;
    const MonthDays = new Date(year, month, 0).getDate();
    dateList = Array.from({
      length: MonthDays
    },
    (val, index) => {
      return {
        year,
        month,
        date: index + 1
      };
    });
    const firstDay = new Date(year, month - 1, 1).getDay();
    const preLastDate = new Date(year, month - 1 ,0).getDate();
    let preYear = year;
    let preMonth = month - 1;
    let nextMonth = month + 1;
    let nextYear = year;
    if(preMonth === 0){
      preMonth = 12;
      preYear -= 1;
    }
    if(nextMonth === 13){
      nextMonth = 1;
      nextYear += 1;
    }
    for(let i = 0; i < firstDay; i ++){
      dateList.unshift({
        year: preYear,
        month: preMonth,
        date: preLastDate - i,
      });
    }
    for(let i = 1,len = 42 - dateList.length; i <=len; i++) {
      dateList.push({
        year:nextYear,
        month:nextMonth,
        date: i,
      });
    }
    const datesBlock = dateList.map((item, index) => {
      return (<div
        key={`${item.year}-${item.month}-${item.date}`}
        className={`calendar-main-date-item ${item.month === month ? '' :'disabled'} ${new Date(item.year, item.month - 1, item.date).toDateString() === activeDate ? 'active' : ''}`}>
        {item.date}
      </div>)
    })
    return (
      <div className="calendar-container" style={{width:`${width}px`,height:`${height}px`, lineHeight: `${lineHeight}px`}}>
        <div className="calendar-top-controller" style={{height: `${lineHeight}px`}}>
          <div onClick={this.preYearHandler}>&lt;&lt;</div>
          <div onClick={this.preMonthHandler}>&lt;</div>
          <div className="year-controller">{year}年</div>
          <div className="month-controller">{month}月</div>
          <div onClick={this.nextMonthHandler}>&gt;</div>
          <div onClick={this.nextYearHandler}>&gt;&gt;</div>
        </div>
        <div className="calendar-main-content">
          <div className="calendar-main-title">
            <div>星期日</div>
            <div>星期一</div>
            <div>星期二</div>
            <div>星期三</div>
            <div>星期四</div>
            <div>星期五</div>
            <div>星期六</div>
          </div>
          <div className="calendar-main-date">
            {datesBlock}
          </div>
        </div>
      </div>
    )
  }
}
Calendar.defaultProps = {
  height:600,
}

export default Calendar;
