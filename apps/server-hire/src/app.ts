import useDotenv from '@SH/Initializations/express/lib/useDotenv';
import initPostgres from '@SH/Initializations/database/initPostgres';
import initExpress from '@SH/Initializations/express/initExpress';

useDotenv();
console.log('initializing postgres ....');
initPostgres();

console.log('initializing express ....');
initExpress();
