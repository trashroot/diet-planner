import { Chart as ChartJS, ArcElement, } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement);

interface ChartProps {
    dailyCal: number,
    consumedCal: number
}

const CalChart: React.FC<ChartProps> = ({ dailyCal, consumedCal }) => {
    let remainigCal = dailyCal - consumedCal;

    const data = {
        datasets: [
          { 
            data: [remainigCal, consumedCal],
            backgroundColor: [
              'rgba(255, 255, 255, 1)',
              'rgba(66,140,255, 1)',
            ],
            borderWidth: .8,
          },
        ],
      };
    
      const options = {
        cutout: '80%',        
        // rotation: 180
      }     

  return (
    <div className='' style={{width:'85%', margin: 'auto', position: 'relative'}}>
        <div className='daily_cal'>
            <span>{dailyCal}</span>
            {/* <div>{dailyCal}</div> */}
        </div>
        <Doughnut data={data} options={options}  />
    </div>
  );
};

export default CalChart;
