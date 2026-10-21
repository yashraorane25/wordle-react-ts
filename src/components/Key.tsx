 import type { LetterStatus } from '../types';                                                                                                                                      
                                                                                                                                                                                       
    interface KeyProps {                                                                                                                                                               
      value: string;                                                                                                                                                                   
      status?: LetterStatus;                                                                                                                                                           
      onClick: (value: string) => void;                                                                                                                                                
    }                                                                                                                                                                                  
                                                                                                                                                                                       
    export const Key = ({ value, status = 'empty', onClick }: KeyProps) => {                                                                                                           
      // Check if it's a wide key (ENTER or BACKSPACE)                                                                                                                                 
      const isSpecialKey = value === 'ENTER' || value === 'BACKSPACE';                                                                                                                 
      const className = `key ${isSpecialKey ? 'key-wide' : ''} ${status}`;                                                                                                             
                                                                                                                                                                                       
      const handleClick = () => {                                                                                                                                                      
        onClick(value);                                                                                                                                                                
      };                                                                                                                                                                               
                                                                                                                                                                                       
      return (                                                                                                                                                                         
        <button className={className} onClick={handleClick} type="button">                                                                                                             
          {value === 'BACKSPACE' ? '⌫' : value}                                                                                                                                        
        </button>                                                                                                                                                                      
      );                                                                                                                                                                               
    }; 