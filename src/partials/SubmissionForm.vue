<template>
<div class="content">
        <div class="center">
        <h1>Send Request</h1>
        <form>
            <div class="txt_field">
                <input v-model="reqData.name" type="text" required>
                <span></span>
                <label>Name</label>
            </div>
            <div class="txt_field">
                <input v-model="reqData.email" type="email" required>
                <span></span>
                <label>Email</label>
            </div>
            <div class="txt_field">
                <input v-model="reqData.phone" type="number" required>
                <span></span>
                <label>Phone</label>
            </div>
            <div class="txt_field">
                <textarea v-model="reqData.message" required cols="30" rows="10"></textarea>
                <label class="label-message">Enter Message</label>
            </div>
            <div class="info">We'll Get Back To You Soonest</div>
            <input type="submit" @click.prevent="submitedData" value="Get Quote">
            <div class="signup_link">
                <!-- Not a member? <a href="#">Signup</a> -->
            </div>
        </form>
    </div>
</div>
</template>

<script>
import DataService from '../services/SwitchApi';

export default {
    data(){
        return {
            reqData: {
                name: "",
                email: "",
                phone: null,
                message: "",
                calculatorId: "",
                clientPandT: {
                    time: null,
                    cost: null
                },
                clientOptions: []
            }
        }
    },

    methods: {
        submitedData() {
            console.log("DATA SUBMITED BELOW")
            console.log(this.reqData)
            DataService.sendResults(this.reqData).then(() => {
                console.log("Response Came")
                this.reqData.name = '';
                this.reqData.email = '';
                this.reqData.phone = null,
                this.reqData.message = '';
                this.reqData.calculatorId = '';
                this.reqData.clientPandT.time = null;
                this.reqData.clientPandT.cost = null;
                this.reqData.clientOptions = [];
                localStorage.removeItem('answers');
                localStorage.removeItem('calculator_result');
                localStorage.removeItem('final_tandc');

            }).catch(err => {
                console.log("There was an error")
                console.log(err);
            })
        }
    },

    created() {
        if(localStorage.getItem('final_tandc')) {
            this.reqData.clientPandT = JSON.parse(localStorage.getItem('final_tandc'));
        }

        if(localStorage.getItem('answers')) {
            this.reqData.clientOptions = JSON.parse(localStorage.getItem('answers'));
        }

        if(localStorage.getItem('calcId')){
            this.reqData.calculatorId = JSON.parse(localStorage.getItem('calcId'));
        }
    }
}
</script>

<style scoped>

.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40vw;
    background-color: #f2f2f2;
    border: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
.center h1 {
    text-align: center;
    padding: 0 0 20px 0;
    border-bottom: 1px solid#595959;
    color:#595959;
}

.center form {
    padding: 0 40px;
    box-sizing: border-box;
}

form .txt_field {
    position: relative;
    border-bottom: 2px solid#595959;
    margin:  30px 0;
}

.txt_field input  {
    width: 100%;
    padding: 0 5px;
    height: 40px;
    font-size: 16px;
    border: none;
    background: none;
    outline: none;
}

.txt_field textarea{
    width: 100%;
    padding: 0 5px;
    height: 80px;
    font-size: 16px;
    border: none;
    background: none;
    outline: none;
}

.txt_field label {
    position: absolute;
    top: 50%;
    left: 5px;
    color: #595959;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    transition: .5s;
}

.txt_field .label-message {
    position: absolute;
    top: 10%;
    left: 5px;
    color: #595959;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    transition: .5s;
}

.txt_field span::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    width: 0%;
    height: 2px;
    background: #262626; 
    transition: .5s;

}

.txt_field input:focus ~ label,
.txt_field input:valid ~ label {
    top: -5px;
    color: #262626;

}

.txt_field textarea:focus ~ label,
.txt_field textarea:valid ~ label {
    top: -8px;
    color: #262626;
}

.txt_field input:focus ~ span::before,
.txt_field input:valid ~ span::before {
    width: 100%;
}

.info {
    margin: -5px 0 20px 5px;
    color: #595959;
    cursor: pointer;
    text-align: center;
}

.pass:hover {
    text-decoration: underline;
}

input[type="submit"] {
    width: 100%;
    height: 50px;
    border: 1px solid transparent;
    background: #595959;
    border-radius: 3px;
    font-size: 18px;
    color: #e9f4fb;
    font-weight: 700;
    cursor: pointer;
    outline: none;
}   


input[type="submit"]:hover {
    border-color: #595959;
    transition: .5s;
}


.signup_link a:hover {
    text-decoration: underline;
}



@media screen and (max-width: 1265px){
    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60vw;
        background-color: gray;
        border: 10px;
    }
}

@media screen and (max-width: 738px){
    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80vw;
        background-color: gray;
        border: 10px;
    }
}


@media screen and (max-width: 441px){
    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 95vw;
        background-color: gray;
        border: 10px;
    }
}
</style>