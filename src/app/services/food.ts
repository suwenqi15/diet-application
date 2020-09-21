export class Food {
    id: number;
    uuid: string;
    timeframe: string;
    category: string;
    food_name: string;
    unit: string;
    qty: number;
    cho: number;
    fat: number;
    
  }
  

  export class Record{
    id: number;
    timeframe:string;
    dailycho: number;
    dailyfat: number;

  }

  export class Personal{
    id: number;
    uuid: string;
    timeframe: string;
    category: string;
    food_name: string;
    food_type: string;
    unit: string;
    qty: number;
    cho: number;
    fat: number;

  }

  export class System{
    id: number;
    uuid: string;
    timeframe: string;
    category: string;
    food_name: string;
    food_type: string;
    unit: string;
    qty: number;
    cho: number;
    fat: number;

  }

  export class Account{
    id: number;
    patientid: number;
    firstname: string;
    lastname: string;
    email: string;
    birthday: number;
    chobenchmark: number;
    fatbenchmark: number;

  }