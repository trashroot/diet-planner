export const calculateCal = (weight, height, age, gender, activity) => {
    let bmr: number = 0;
    if(gender==='male'){
      bmr = (10*weight + 6.25*height - 5*age + 5)
    }else{
      bmr = (10*weight + 6.25*height - 5*age + 5 -161)
    }    
    return Math.ceil((bmr * activity));
  }