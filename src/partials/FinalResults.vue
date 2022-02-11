<template>
<div class="content">
        <div class="center">
        <h1>Final Cost And Time</h1>
        <form>
            <div class="cost_time">
                <div class="cost">
                    <h4>Price For Service</h4>
                    <h1>{{ result.cost }} FCFA</h1>
                </div>
                <div class="time">
                    <h4>Time Needed</h4>
                    <h1>{{duration}}</h1>
                </div>
            </div>
            <div class="info">Click the button below to send a request</div>
            <input type="submit" value="Send Request" @click.prevent="sendRequest">
            <div class="signup_link">
                <!-- Not a member? <a href="#">Signup</a> -->
            </div>
        </form>
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                result: {},
                duration: "",
                unit: "Months",
                units: {
                    "year": 24*60*365,
                    "month": 24*60*30,
                    "week": 24*60*7,
                    "day": 24*60,
                    "minute": 1
                }
            }
        },

        methods: {
            sendRequest() {
                localStorage.setItem('final_tandc', JSON.stringify({time: this.duration, cost: this.result.cost}));
                this.$emit("showSendRequest");
            },
            convertSecondToHDM(seconds) {
                seconds = Number(seconds);
                var d = Math.floor(seconds / (3600*24));
                var h = Math.floor(seconds % (3600*24) / 3600);
                var m = Math.floor(seconds % 3600 / 60);
                var s = Math.floor(seconds % 60);

                var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
                var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
                var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
                var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
                return dDisplay + hDisplay + mDisplay + sDisplay;
            },

            convertMinToSec(min) {
                return min * 60;
            }
        },

        created() {
            if(localStorage.getItem('calculator_result')) {
                this.result = JSON.parse(localStorage.getItem("calculator_result"));
            }
            let sec = this.convertMinToSec(this.result.time);
            let final = this.convertSecondToHDM(sec);
            console.log(final.split(''))
            if(final.split('')[final.length-2] == ',') {
                console.log("YES SEMI COLUM ENDING")
                final =final.split('');
                final.pop();
                final.pop();
                final = final.join('')
            }
            this.duration = final;
            

        }
    }
</script>

<style scoped>

.cost_time {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cost,.time {
    display: grid;
}

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
    background: rgba(178, 30, 158, 0.98);
    transition: .5s;

}

.txt_field input:focus ~ label,
.txt_field input:valid ~ label {
    top: -5px;
    color: rgba(178, 30, 158, 0.98);

}

.txt_field textarea:focus ~ label,
.txt_field textarea:valid ~ label {
    top: -8px;
    color: rgba(178, 30, 158, 0.98);
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