import initPostgres from '@SH/Initializations/database/initPostgres';
import initExpress from '@SH/Initializations/express/initExpress';

console.log('initializing postgres ....');
initPostgres();
console.log('initializing express ....');
initExpress();
