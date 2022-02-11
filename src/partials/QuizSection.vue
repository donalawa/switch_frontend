<template>
     <div class="content">
            <!-- <h5>Question 5/10</h5> -->
            <!-- <img src="./undraw_progress_tracking_re_ulfg.svg" width="200px" alt=""> -->
            <h2 :style="{color: info.primaryColor}">{{question.questionText_En }}</h2>
            <div class="answers">

                <div class="answer-card" :style="{color: info.primaryColor}" :key="index" v-for="(answer,index) in question.options">
                    <div class="card-up">
                       <div class="check">
                           <input type="checkbox" :checked="currentSelectedAnswers.indexOf(answer._id) >= 0" @change="optionSlected(answer,index)" name="answer_check" id="answer_check">
                       </div> 
                       <p class="answer-text">{{ answer.optionText_En }}</p>
                    </div>
                    <hr class="style">
                    <div class="card-footer">
                       <div class="time">
                           <i class="fas fa-stopwatch"></i>
                           <p class="space">{{ answer.optionTime }} hrs</p>
                       </div>
                       <div class="cost">
                           <i class="fas fa-money-bill-wave"></i>
                           <p class="space">{{ answer.optionCost }} FCFA</p>
                       </div>
                    </div>
               </div>
               
            </div>
        </div>
</template>


<script>
export default {
    data(){
        return {
            selectedAnswers: [],
            currentSelectedAnswers: []
        }
    },

    props: {
        question: {
            type: Object,
            required: true
        },
        info: {
            type: Object,
            required: true
        }
    },

    methods: {
        optionSlected: function(option,index) {
            this.$emit('selectedanswer', option,index)
        }
    },

    created() {
        console.log("CREATED THIS COMPONENT");
        if(localStorage.getItem('answers')){
            this.selectedAnswers = JSON.parse(localStorage.getItem('answers'));
        }
        
        this.selectedAnswers.forEach(answer => {
            this.currentSelectedAnswers.push(...answer.options);
        })
    console.log(this.currentSelectedAnswers)            
        console.log(this.info.answers)
    }
}
</script>

<style>

</style>