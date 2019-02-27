<template>
  <div class="datePicker">
    <div class="datePickerHeader">
      <div class="pickerHeaderBtn preYearBtn" @click="preYearHandler">&lt;&lt;</div>
      <div class="pickerHeaderBtn preMonthBtn" @click="preMonthHandler">&lt;</div>
      <div class="pickerHeaderBtn yearText">
        <div>{{chooseYear}}年</div>
      </div>
      <div class="pickerHeaderBtn monthText">
        <div @click="chooseMonthHandler">{{chooseMonth}}月</div>
        <div v-show="monthChooseShow" class="monthChooseContianer">
          <div v-for="month in 12" class="month" :class="{active:month === chooseMonth}" @click="monthChoose(month)">{{month}}月</div>
        </div>
      </div>
      <div class="pickerHeaderBtn nextMonthBtn"  @click="nextMonthHandler">&gt;</div>
      <div class="pickerHeaderBtn nextYearBtn" @click="nextYearHandler">&gt;&gt;</div>
    </div>
    <div class="datePickerContainer">
      <div class="dayContainer">
        <div class="day">日</div>
        <div class="day">一</div>
        <div class="day">二</div>
        <div class="day">三</div>
        <div class="day">四</div>
        <div class="day">五</div>
        <div class="day">六</div>
      </div>
      <div class="dateContainer">
        <div
          class="dateChoose"
          v-for="(date,index) in dateList"
          :key="index"
          :class="{disabeld:date.disabled,active:new Date(chooseYear,date.month,date.value).toDateString() === activeDate}"
          @click="dateChoose(date)">
          {{date.value}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'datePicker',
  data() {
    return {
      chooseYear: '',
      chooseMonth: '',
      activeDate: null,
      monthChooseShow: false,
    }
  },
  computed:{
    dateList(){
      let allDays = [];
      const year = this.chooseYear;
      const month = this.chooseMonth;
      const nowDayLength = new Date(year, month, 0).getDate();

      allDays = Array.from({
        length: nowDayLength
      },
      (val, index) => {
        return {
          month: month - 1,
          disabled: false,
          value: index + 1
        };
      });
      const lastDate = new Date(year, month - 1, 0).getDate();
      const firstDay = new Date(year, month - 1, 1).getDay();
      for(let i = 0; i < firstDay; i ++){
        allDays.unshift({
          month: month - 2,
          disabled: true,
          value: lastDate - i
        })
      }
      const nextLength = 42 - allDays.length;
      const nextDays = Array.from({
        length: nextLength
      },
      (val, index) => {
        return {
          month,
          disabled: true,
          value: index + 1
        };
      });
      allDays = allDays.concat(nextDays);
      return allDays;
    }
  },
  created() {
    const now = new Date();
    this.activeDate = now.toDateString();
    this.chooseYear = now.getFullYear();
    this.chooseMonth = now.getMonth() + 1;
  },
  methods: {
    preMonthHandler(){
      if(this.chooseMonth === 1){
        this.chooseYear -= 1;
        this.chooseMonth = 12;
      }else {
        this.chooseMonth -= 1;
      }
    },
    nextMonthHandler(){
       if(this.chooseMonth === 12){
        this.chooseYear += 1;
        this.chooseMonth = 1;
      }else {
        this.chooseMonth += 1;
      }
    },
    preYearHandler(){
      this.chooseYear -= 1;
    },
    nextYearHandler(){
      this.chooseYear += 1;
    },
    chooseMonthHandler() {
      this.monthChooseShow = !this.monthChooseShow ;
    },
    monthChoose(month) {
      this.chooseMonth = month;
      this.monthChooseShow = false;
    },
    dateChoose(date) {
      this.activeDate = new Date(this.chooseYear,date.month,date.value).toDateString()
      this.chooseMonth = date.month + 1;
      if(this.chooseMonth > 12){
        this.chooseYear += 1;
        this.chooseMonth = 1;
      }
      if(this.chooseMonth < 1){
         this.chooseYear -= 1;
        this.chooseMonth = 12;
      }

    }
  }
}
</script>

<style scoped>
.datePicker{
  position: relative;
  width: 300px;
  height: 335px;
  border: 1px solid #bbbbbb;
  border-radius: 10px;
}
.datePickerHeader{
  display: flex;
  justify-content: space-around;
  font-size: 18px;
  background: #bbb;
  color: #fff;
  padding: 10px 0;
      border-radius: 9px 9px 0 0;
}
.pickerHeaderBtn{
  cursor: pointer;
}
.dayContainer{
  display: flex;
  justify-content: space-around;
  font-size: 16px;
  padding: 10px 0;

}
.dayContainer .day{
     width: 14.2%;
     text-align: center;
  }
.dateContainer{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  font-size: 16px;
}
.dateChoose{
  width: 14.2%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  border: 2px transparent solid;
  box-sizing: border-box;
  cursor: pointer;
}
.dateChoose:hover{
  border: 2px solid #bbbbbb;
}
.dateChoose.disabeld{
      color: #cbc9c9;
}
.dateChoose.active{
    border: #68a7f9 2px solid;
    background: #68a7f9;
    color: white;
}
.monthChooseContianer{
    position: absolute;
    width: 100%;
    left: 0px;
    height: 285px;
    top: 47px;
    background: #fff;
    color: #333;
    display: flex;
    flex-wrap: wrap;
    border-radius: 0 0 10px 10px;
}
.monthChooseContianer .month{
  text-align:  center;
  width: 25%;
      line-height: 95px;
}
.monthChooseContianer .month.active{
    background: #68a7f9;
    color: white;
}
</style>

