import useDotenv from '@Initializations/express/lib/useDotenv';
import initPostgres from '@Initializations/database/initPostgres';
import initExpress from '@Initializations/express/initExpress';

useDotenv();
console.log('initializing postgres ....');
initPostgres();

console.log('initializing express ....');
initExpress();
