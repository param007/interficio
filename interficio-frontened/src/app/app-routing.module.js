"use strict";
var home_component_1 = require("./home/home.component");
var instruction_component_1 = require("./instruction/instruction.component");
var question_component_1 = require("./question/question.component");
var leaderboard_component_1 = require("./leaderboard/leaderboard.component");
var login_component_1 = require("./login/login.component");
exports.routes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent,
        children: [
            { path: '', redirectTo: 'instruction' },
            { path: 'instruction', component: instruction_component_1.InstructionComponent },
            { path: 'question/:id', component: question_component_1.QuestionComponent },
            { path: 'leaderboard', component: leaderboard_component_1.LeaderBoardComponent }
        ]
    }
];
exports.navigatableComponents = [
    login_component_1.LoginComponent,
    home_component_1.HomeComponent,
    instruction_component_1.InstructionComponent,
    question_component_1.QuestionComponent,
    leaderboard_component_1.LeaderBoardComponent
];
//# sourceMappingURL=app-routing.module.js.map