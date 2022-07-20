<template>
    <div class="container">
        <div class="header">
            <img class="logo" :src="info.logoImgUrl" alt="">
            <h3 :style="{color: info.primaryColor, textAlign: 'center'}" class="cal-name">{{ calc_info.name }}</h3>
            <button :style="{backgroundColor: info.primaryColor}"  class="btn-primary">Back To Site</button>
        </div>
        <transition name="fade" v-if="!showRequestForm && !showFinalResult">
            <QuizSection @selectedanswer="selectedNewOption" :question="questions[currentQuestion]" :key="currentQuestion" :info="info"/>
        </transition>
        <transition v-if="showRequestForm && !showFinalResult">
	
            <SubmissionForm />
	    
        </transition>

        <transition v-if="showFinalResult && !showRequestForm" :key="showFinalResult">
            <FinalResults @showSendRequest = "showRequesForm"/>
        </transition>

        <div class="footer">
            <button class="btn-prev" :class="{disabled: currentQuestion == 0}" @click.prevent="prevQuestion">Prev</button>
            <!-- <p>Progress</p> -->
            <div class="progress-parent">
                <div :style="{backgroundColor: info.primaryColor, width: (currentQuestion * 100) / questions.length + '%'}" class="progress"></div>
            </div>
            <button :style="{backgroundColor: info.primaryColor}" @click.prevent="changeQuestion" class="btn-next">Next Question</button>
        </div>
    </div>
</template>

<script>

import QuizSection from "../partials/QuizSection.vue";
import SubmissionForm from "../partials/SubmissionForm.vue";
import FinalResults from "../partials/FinalResults.vue";

export default {

components: {
    QuizSection,
    SubmissionForm,
    FinalResults
},

data(){
    return {
        showRequestForm: false,
        showFinalResult: false,
        currentQuestion: 0,
        userOptions: [],
        optionsToSave: {questionId: null, options: []},
        tempOptions: [],
        newOption: {questionId: null, optionId: null},
        finalResult: {time: 0, cost: 0}
    }
},
props: {
    info: {
      type: Object,
      required: true,
    },
    calc_info: {
        type: Object
    },
    questions: {
        type: Array
    }
},

methods: {
    showRequesForm: function() {
        console.log("REQUEST GOT HERE GOOD")
        this.showRequestForm = true;
        this.showFinalResult = false;
    },
    selectedNewOption: function(option,optionsIndex,) {
        console.log("JUST ENTERING AND LOGGIN");
        console.log(this.tempOptions)
        console.log("#######$$$$$$$$$$$$$$$$")
        console.log("USER SELECTED OPTIONS BELOW")
        let optionExist = false;
        let optionExistInTmp = false;
        let optionPosInTmp = null;
        let quesPos = null;
        let optPos = null;
        for(let i = 0; i < this.userOptions.length; i++) {
            this.userOptions[i].options.forEach((opt,index) => {
                if(opt == option._id){
                    console.log("OPTION EXISTING SO IT SHOULD NOT ADD IT SHOULD REMOVE")
                    // this.finalResult.cost
                    if(!this.currentQuestion == 0) {
                        this.finalResult.time -= option.optionTime;
                        this.finalResult.cost -= option.optionCost;
                    }
                    optionExist  = true;
                    quesPos = i;
                    optPos = index;
                }
            });
        }

        this.tempOptions.forEach((tmpOpt,index) => {
            if(JSON.parse(tmpOpt).optionId == option._id) {
                optionExistInTmp = true;
                optionPosInTmp = index;
            }
        })

        console.log("##########################")

            if(optionExistInTmp) {
                console.log("OPTION ALREADY IN TEMP")
                this.tempOptions.splice(optionPosInTmp,1);
                this.finalResult.time -= option.optionTime;
                this.finalResult.cost -= option.optionCost;
                console.log("FINAL RESULT BELOW")
                console.log(this.finalResult)
            }
        
        if(!optionExist && !optionExistInTmp) {
            console.log("OPTION STILL NEW")
            console.log(this.tempOptions);
            console.log("EXAMPLE OF OPTION OBJECT BELOW")
            console.log(option);
            console.log(optionsIndex);
            this.newOption.questionId = option.questionId;
            this.newOption.optionId = option._id;
            this.tempOptions.push(JSON.stringify(this.newOption));
            //  ADD THE OPTION TIME AND COST TO THE EXISTING ONE
            this.finalResult.time += option.optionTime;
            this.finalResult.cost += option.optionCost;
            console.log("FINAL RESULT BELOW")
            console.log(this.finalResult)
            console.log("FINAL RESULT BELOW")
            console.log(this.finalResult)

            console.log("temp option below")
            console.log(this.tempOptions);
        }



        if(optionExist) {
            if(this.currentQuestion == 0) {
            console.log("OPTION EXIST IN TEMP");
            console.log(this.tempOptions);
            // this.tempOptions.splice(optionPosInTmp,1);
            this.userOptions[quesPos].options.splice(optPos,1);


            console.log("temp option after splice")
            console.log(this.tempOptions)
            console.log("JUST TEST")
            console.log(optionExist)
            console.log(quesPos)
            console.log(optPos)
            // let pos = null;
            // for(let i = 0; i < this.tempOptions.length; i++) {
            //     if(this.tempOptions[i].optionId == option._id) {
            //         pos = i;
            //     }
            // } 
            // if(pos != null) {
            //     this.tempOptions.splice(pos,1);
            // }

            // console.log("TEMP OPTION AFTER SPLICE")
            // console.log(this.tempOptions)
            // console.log(this.tempOptions.length)
        }else {
            console.log("%%%%%%%%OPTION ALSO EXIST IN LC%%%%%%%%%%")
            this.userOptions[quesPos].options.splice(optPos,1);
            console.log("FINAL RESULT BELOW")
            console.log(this.finalResult)
        }
    }
},

    setAnswerToLs: function() {
        console.log("USER OPTIONS TO BE SENT TO LC BL")
        console.log(this.userOptions)
        localStorage.setItem("answers", JSON.stringify(this.userOptions));
        this.userOptions = JSON.parse(localStorage.getItem('answers'));
        localStorage.setItem("calculator_result", JSON.stringify(this.finalResult));
        this.finalResult = JSON.parse(localStorage.getItem("calculator_result"));
        this.optionsToSave.questionId = null;
        this.optionsToSave.options = [];
        this.tempOptions = [];
        this.newOption = {};
    },

    changeQuestion: function() {
        let optionNothingExist = false;
        // if(this.tempOptions.length < 1) {
        //     console.log("HAS TO SELECT ANSWER")
        //     return;
        // }
        if(this.userOptions.length > 0) {
            this.userOptions.forEach(ques => {
            console.log(ques)
            if(ques.options.length < 1) {
                console.log("Empty Option Exist")
                optionNothingExist = true;
            }
        })
        }else {
            optionNothingExist = true;
        }

        if(this.tempOptions.length < 1 && optionNothingExist) {
            console.log("CONDITION NOT MET AND NOTHING ACTUALY EXIST")
            console.log(optionNothingExist)
            return;
        }

        if(this.currentQuestion > this.userOptions.length - 1 && this.tempOptions.length < 1) {
            console.log("GUESS THE END QUESTION WAS NOT ANSWERED")
            console.log("YOU HAVE NOT ANSWERED TILL THIS POINT");
            return;
        }

        if(this.tempOptions.length > 0) {
            this.optionsToSave.questionId = JSON.parse(this.tempOptions[0]).questionId;
            this.tempOptions.forEach(ele => {   
                this.optionsToSave.options.push(JSON.parse(ele).optionId);
            });
        }

        let pos = null;
        for(let i = 0; i < this.userOptions.length; i++) {
            if(this.userOptions[i].questionId == this.optionsToSave.questionId) {
                pos = i;
                break;
            }
        }
        if(pos != null) {
            if(pos > 0) {
                this.userOptions[pos].options.push(...this.optionsToSave.options);
            }else {
                this.userOptions[pos] = this.optionsToSave;
            }
        }else {
            console.log("POSITION REMAINS NULL")
            console.log(this.userOptions)
            console.log("OPTION TO SAVE BELOW AFTER CHECK AND REPLACE")
            console.log(this.optionsToSave);
       
            if(this.optionsToSave.questionId != null) {
                this.userOptions.push(this.optionsToSave);
            }
        }


        this.setAnswerToLs();

        if(this.currentQuestion == this.questions.length - 1 && !(this.tempOptions.length < 1 && optionNothingExist)) {
            this.showFinalResult = true;
            this.currentQuestion += 1;
            console.log("SHOW REQUEST FORM");
            console.log(this.showRequestForm)
            return;
        }
        if(this.currentQuestion >= this.questions.length - 1) {
            this.currentQuestion = this.questions.length - 1;
            return; 
        }else {
            this.currentQuestion = this.currentQuestion += 1;

        }

    },
    prevQuestion: function() {
        if(this.currentQuestion == 0) {
            return;
        }

        this.currentQuestion = this.currentQuestion -= 1;
    }
},

created() {
    console.log(this.questions)
    if(localStorage.getItem('answers')) {
        this.userOptions = JSON.parse(localStorage.getItem('answers'));
        if(this.userOptions.length > 0) {
            this.userOptions[0].options.forEach(opt => {
                this.tempOptions.push(JSON.stringify({questionId: this.userOptions[0].questionId, optionId: opt}))
            })

            console.log("USER TEMP OPTION ON START");
            console.log(this.tempOptions)
        }
    }

    if(localStorage.getItem('calculator_result')) {
        this.finalResult = JSON.parse(localStorage.getItem("calculator_result"));
        console.log("FINAL RESULT BELOW")
        console.log(this.finalResult)
    }
}

}
</script>

<style>

/* BELOW OK */
.fade-enter-active {
  transition: opacity 0.5s ease;
  -webkit-animation: slide-in-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-left 3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    

}


/* Leaving Animation */


/* Enter Animation */

@keyframes slide-in-left {
  0% {
    -webkit-transform: translateY(1000px);
            transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

.btn-prev.disabled {
    /* color: rgb(120, 126, 120); */
    opacity: .4;
}
.btn-prev.disabled:hover {
    cursor:wait;
}


.container {
    position: relative;
    width: 100vw;
    height: 100vh;
}
.container > .header > .logo {
    width: 120px;
    height: 50px;
    margin-top: 10px;
}

.container > .header {
    display: flex;
    justify-content: space-between;
}

.container > .header > h3 {
    /* color: #3A96B4; */
    font-size: 25px;
    margin-top: 15px;
}

.container > .header > .btn-primary {
    /* background-color: #3A96B4; */
    border: 1px solid transparent;
    width: 15vw;
    color: white;
    font-size: 18px;
    height: 7vh;
}

.container > .content > h2 {
    width: 65vw;
    text-align: center;
    /* color: #3A96B4; */
    line-height: 1.6;
    font-weight: 500;
}


.container > .content {
    /* background-color: red; */
    width: 100vw;
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}



.answers {
    height: 40vh;
    /* background-color: red; */
    margin-top: 5vh;
    width: 55vw;
    overflow-y: scroll;
    /* border: 1px solid rgba(0, 0, 0, .5); */
    padding-left: 6px;
    border-radius: 10px;
    padding-top: 6px;
    /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
    /* box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px; */
    /* box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset; */
    animation: float-answers 8s ease-in-out infinite;
}


@keyframes float-answers {
	0% {
		
		transform: translatey(0px);
	}
	50% {
		box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
		transform: translatey(-13px);
	}
	100% {
		transform: translatey(0px);
	}
}

::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 2px;
}
  
::-webkit-scrollbar-thumb {
border-radius: 4px;
background-color: rgba(0, 0, 0, .5);
box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}


.answers > .answer-card {
    background-color: #E5E8EF;
    /* height: 7vh; */
    border: 1px solid transparent;
    border-radius: 10px;
    /* color: #3A96B4; */
    /* display: grid; */
    /* justify-content: left; */
    padding: 0 2vw;
    align-items: center;
    margin-bottom: 1vh;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.answers > .answer-card > .card-up {
    display: flex;
    align-items: center;
}

.answers > .answer-card > .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.answer-text {
    font-size: 18px;
}

hr.style {
    border: 0;
    border-bottom: 1px dashed #ccc;
    background: #3A96B4;
}

.space {
    padding-left: 10px;
}

.time, .cost {
    display: flex;
    align-items: center;
    font-size: 15px !important;
}


.answers > .answer-card:hover {
    cursor: pointer;
}

.answers > .answer-card > .icon {
    margin-right: 2vh;
    background-color: #E3F8FD;
    padding: 1vh;
    border-radius: 50%;
}

.answers > .answer-card >.card-up >  .check {
    margin-right: 2vh;
}


.answers > .answer-card.active {
    background-color: #3A96B4;
    color: white;
}

.answers > .answer-card > .icon.active {
    background-color: #3A96B4;
}

.footer  {
    width: 95vw;
    height: 5vh;
    background-color: #E5E8EF;
    margin: auto;
    border-radius: 8px;
    /* padding: 2px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer > .btn-next {
    /* background-color: #3A96B4; */
    border: 1px solid transparent;
    width: 13vw;
    color: white;
    height: 4vh;
    border-radius: 5px;
}

.footer > .btn-next:hover , .footer > .btn-prev:hover {
    cursor: pointer;
}

.footer > .btn-prev {
    background-color: #c2c9da;
    border: 1px solid transparent;
    width: 5vw;
    color: black;
    height: 4vh;
    border-radius: 5px;
}

/* PROGRESS BAR */

.progress-parent {
    width: 100%;
    height: 3px;
    background-color: gray;
    margin-left: 8px;
    margin-right: 8px;
    z-index: 1;
}
.progress {
    /* width: 30%; */
    height: 3px;
    /* background-color: #3A96B4; */
    margin-left: 1px;
    margin-right: 8px;
    z-index: 2;
    
}

.cal-name {
    margin-left: 8.3vw !important;
}


/* MEDIA QUERY */

@media screen and (min-width: 1098px) {

.cal-name {
    margin-left: 4.5vw;
}

.container > .content > h2 {
    font-size: 20px;
    max-width: 900px;
}


.container > .content {
    /* background-color: red; */
    max-width: 1050px !important;
    margin: 0 auto;
}



.answers {
    max-width: 650px !important;
}

}

@media screen and (max-width: 1094px) {
    .cal-name {
        margin-left: 1vw;
    }
}
@media screen and (max-width: 934px) {
    .cal-name {
        margin-left: 2.5vw;
    }
}
@media screen and (max-width: 919px) {
    .container > .content > h2 {
        font-size: 18px;
    }
    
}

@media screen and (max-width: 800px) {

    .container > .content > h2 {
        max-width: 95vw;
        width: 95vw;
        font-size: 16px;
    }
    
    
    .container > .content {
        /* background-color: red; */
        max-width: 95vw !important;
        width: 95vw;
        margin: 0 auto;
    }

    .answers {
        width: 90vw;
    }

    .footer > .btn-prev {
        width: 11vw;
    }

    .footer > .btn-next {
        width: 20vw;
    }
    
    
}


@media screen and (min-width: 800px) and (max-width: 1000px) {

    .container > .content > h2 {
        max-width: 80vw;
        width: 85vw;
        font-size: 20px;
    }

    
    
    
    .container > .content {
        /* background-color: red; */
        max-width: 80vw !important;
        width: 90vw;
        margin: 0 auto;
    }

    .answers {
        width: 75vw;
    }
    
    
}

@media screen and (max-width: 465px){
    .container > .header > h3 {
        font-size: 5vw;
    }

    .container > .header > .logo {
        width: 18vw;
        height: 8vw;
    }

    .container > .header > .btn-primary {
        width: 22vw;
        height: 13vw;
        font-size: 4vw;
    }
}

@media screen and (max-width: 400px){
    .cal-name {
        margin-left: .5vw;
    }
    .container > .content {
        height: 81vh;
    }

    .container > .content > h2 {
        font-size: 15px;
    }

    .container > .footer {
        height: 7vh;
    }

    .container > .footer > .btn-next, .container > .footer > .btn-prev {
        /* width: 22vw; */
        height: 10vw;
        font-size: 4vw;
    }
}

</style>
