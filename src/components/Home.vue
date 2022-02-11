<template>
  <div>
    <transition
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
    <Landing :info="info" @start_question="toggleShowLanding" v-if="showLanding"/>

    </transition>

      <transition
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
    <Questions :info="info"  :questions="questions" :calc_info="calc_info" v-if="!showLanding"/>
      </transition>
  </div>
</template>

<script>
import DataService from '../services/SwitchApi';
import Landing from './Landing.vue';
import Questions from './Questions.vue';

export default {
  components: { 
    Landing,
    Questions
  },
  data() {
    return {
      showLanding: true,
      info: {
        title_en: null,
        description_en: null,
        facebookUrl: null,
        twitterUrl: null,
        calcEmail: null,
        calcPhone: null,
        secondaryColor: null,
        primaryColor: null,
        linkedin: null,
        logoImgUrl: null,
        bgImgUrl: null
      },

      calc_info: {

      },

      questions: []
    };

  },

  methods: {
    toggleShowLanding() {
      this.showLanding = false;
    }
  },

  created() {
    let link = this.$route.params.calcLink;
    console.log(link)
    console.log(this.$route.params)
    if(link) {
      DataService.getCalculatorThemeInfo(link).then(res => {
        console.log("Response For Details Came");
        console.log(res.data.info)
        if(localStorage.getItem('calcId')) {
          //  CLEAR EVERYTHING AND SET NEW ONES
          let calcId = JSON.parse(localStorage.getItem('calcId'));
          console.log('Before Second If');
          console.log(calcId);
          if(calcId != res.data.info.calculatorId) {
            localStorage.removeItem('answers');
            localStorage.removeItem('calculator_result');
            localStorage.removeItem('final_tandc');
            localStorage.setItem('calcId', JSON.stringify(res.data.info.calculatorId))
          }
          
        }else {
          localStorage.setItem('calcId', JSON.stringify(res.data.info.calculatorId))
        }
        DataService.getCalculatorInfo(res.data.info.calculatorId).then(res => {
          this.calc_info = res.data.calculator;
        })

        DataService.getCalculatorQuestions(res.data.info.calculatorId).then(res => {
          this.questions = res.data.questions;
          console.log(res)
        })
        this.info.title_en = res.data.info.title_en;
        this.info.description_en = res.data.info.description_en;
        this.info.facebookUrl = res.data.info.facebookUrl;
        this.info.twitterUrl = res.data.info.twitterUrl;
        this.info.calcEmail = res.data.info.calcEmail;
        this.info.calcPhone = res.data.info.calcPhone;
        this.info.secondaryColor = res.data.info.secondaryColor;
        this.info.primaryColor = res.data.info.primaryColor;
        this.info.linkedin = res.data.info.linkedin;
        this.info.logoImgUrl = res.data.info.logoImgUrl;
        this.info.bgImgUrl = res.data.info.bgImgUrl;
      })
    }
  }
};
</script>

