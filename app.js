#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// games variable
let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamageToHero = 25;
// player variable
let heroHealth = 100;
let attackDamageToEnemy = 50;
let numberOfHeals = 3;
let healValue = 30;
let healthPotionDropChance = 50;
// while loop
let gameRunning = true;
console.log(chalk.bgBlue.bold("\n\tWelcome to the DeadZone!\t"));
Game: while (gameRunning) {
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
    let enemyIndex = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[enemyIndex];
    console.log(chalk.bgCyanBright.bold(`\n# ${enemy} has appeared! #`));
    while (enemyHealth > 0) {
        console.log(chalk.bgYellowBright.bold(`\n\tYour health is ${heroHealth}\t`));
        console.log(chalk.bgGreenBright.bold(`\n${enemy}'s health is ${enemyHealth}\n`));
        let options = await inquirer.prompt([
            {
                type: "list",
                name: "ans",
                message: "What do you want to do?",
                choices: ["1. Attack", "2. Heal", "3. Run"],
            },
        ]);
        if (options.ans === "1. Attack") {
            let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
            let damageToHero = Math.floor(Math.random() * enemyAttackDamageToHero + 1);
            enemyHealth -= damageToEnemy;
            heroHealth -= damageToHero;
            console.log(chalk.bold.green(`\nYou strike the ${enemy} for ${damageToEnemy}`));
            console.log(chalk.green(`\n${enemy} strike you for ${damageToHero} damage.`));
            if (heroHealth < 1) {
                console.log(chalk.green(`\nYou have taken too much damage. You are to weak to continue.`));
                break;
            }
        }
        else if (options.ans === "2. Heal") {
            if (numberOfHeals > 0) {
                heroHealth += healValue;
                numberOfHeals--;
                console.log(chalk.blue(`\nYou heal for ${healValue}. You now have ${heroHealth} health`));
                console.log(chalk.blue(`\nYou have ${numberOfHeals} heals left.`));
            }
            else {
                console.log(chalk.bgRed(`\n\tYou have no more heals left. Defeat enemy for a chance to get heals.\t`));
            }
        }
        else if (options.ans === "3. Run") {
            console.log(chalk.bgYellowBright(`\n\tYou run away from the ${enemy}\t`));
            continue Game;
        }
    }
    if (heroHealth < 1) {
        console.log(chalk.bgRed(`\n\tYou are out from battle. You are too weak.\t`));
        break;
    }
    console.log(chalk.bgBlueBright(`\n\t# ${enemy} was defeated! #\t`));
    console.log(chalk.bgBlueBright(`\n# You have ${heroHealth} health left. #`));
    let randomNumber = Math.floor(Math.random() * 100 + 1);
    if (randomNumber <= healthPotionDropChance) {
        numberOfHeals++;
        console.log(chalk.greenBright(`\n\t# The ${enemy} dropped a health potion! #\n\t`));
        console.log(`Your health is ${heroHealth}`);
        console.log(chalk.greenBright(`\n\t# You now have ${numberOfHeals} heals. #\t`));
    }
    let userOption = await inquirer.prompt({
        type: "list",
        name: "option",
        message: "What would you like to do now.",
        choices: ["1. Continue", "2. Exit"],
    });
    if (userOption.option === "1. Continue") {
        console.log(chalk.bgRed(`\n\t# You continue on your adventure. #\t`));
    }
    else {
        console.log(chalk.bgRed(`\n\t# You exit the game. #\t`));
        break;
    }
}
