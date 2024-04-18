#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todos: string[] = [];
let condition = true;

console.log(chalk.green("\n \t || Wellcome to my Todo list ||\n"));

// while(condition)
// {
//     let todoQuestions = await inquirer.prompt(
//     [
//         {
//         name: "firstQuestion",
//         type: "input",
//         message: chalk.magentaBright("What would you like to add in your todos?")
//     },
//     {
//         name: "secondQuestion",
//         type: "confirm",
//         message: chalk.magentaBright("Would you like to add more in your todos?"),
//         default: "true"
//     }
// ]
// );

// todos.push(todoQuestions.firstQuestion);
// console.log(todos);
// condition = todoQuestions.secondQuestion
// }

let main = async () => {
    while(condition){
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.magentaBright("select an option you want to do :"),
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo-list", "Exit"]
            }
        ]);

        if(option.choice === "Add Task"){
            await addTask()

        }
        else if(option.choice === "Delete Task"){
            await deleteTask()
        }
        else if(option.choice === "Update Task"){
            await updateTask()
        }
        else if(option.choice === "View Todo-list"){
            await viewTask()

        }
        else if(option.choice === "Exit"){
            condition = false;
        }
    }
}
// added new task to the list//
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.blueBright("Enter your new task :")
        }
    ]);

todos.push(newTask.task);
console.log(chalk.yellow(`\n ${newTask.task} task added successfully in todo-list`));

}

// view todo-list//

let viewTask = () => {
    console.log(chalk.yellow("\n Todo-List: \n"));
    todos.forEach((task, index) => {
        console.log(chalk.yellow(`${index + 1}: ${task}`))
    });
}

//Delete task from the list//
let deleteTask = async () => {
    await viewTask()
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.blueBright("Enter the `index no.` of the task you want to delete :")
        }
    ]);

    let deletedTask = todos.splice(taskIndex.index - 1, 1);
    console.log(chalk.yellow(`\n ${deletedTask} this task has been deleted successfully from the list`));
}

// updation of task//

let updateTask = async () => {
    await viewTask()
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.blueBright("Enter the `index no.` of the task you want to update :")
        }, 
        {
            name: "new_task",
            type: "input",
            message: chalk.blueBright("Now Enter the new task name :")
        }
    ]);

    todos[update_task_index.index - 1] = update_task_index.new_task
    console.log(chalk.yellow(`\n Task at index no. ${update_task_index.index - 1} updated successfully [for updated list check option : "view Todo-list"]`));
}

main();
