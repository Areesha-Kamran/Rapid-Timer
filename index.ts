#! /usr/bin/env node

import inquirer from "inquirer";

import {differenceInSeconds} from "date-fns"

import chalk from "chalk";

import chalkAnimation from "chalk-animation";

async function welcome () {
    let title = chalkAnimation.rainbow("\t\t\t\tWelcome to RapidTimer!")
    await new Promise((resolve) => {
        setTimeout(resolve,3000);
    });
    title.stop();
}

await welcome()

const res = await inquirer.prompt([
    {
        name:"userInput",
        type:"number",
        message:(chalk.rgb(0,255,255))("Please Enter the amount of Second"),
        validate:(input)=>{
            if(isNaN(input)){
                return (chalk.red)("Please enter a Valid Number")
            }else if (input > 60){
                return (chalk.rgb(255,102,0))("Seconds must be in 60")
            }else{
                return true;
            }
        }
    }
])

let input = res.userInput

function startTime(val:number){
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval((()=>{
        const currTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime, currTime);

        if (timeDiff <= 0){
            console.log(chalk.rgb(255,0,255)("Timer has Expired"));
            process.exit()
        }

        const min = Math.floor((timeDiff%(3600*24))/3600)
        const sec =Math.floor(timeDiff%60)
        console.log(chalk.rgb(0,128,128)(`${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`));
        
    }),1000)
}

startTime(input)