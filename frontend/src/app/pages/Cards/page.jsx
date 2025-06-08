import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import React from 'react'

const Cards = () => {

    const quotes = [
        {
          quote: "The only way to do great work is to love what you do.",
          name: "Steve Jobs",
          title: "Co-founder of Apple"
        },
        {
          quote: "Believe you can and you're halfway there.",
          name: "Theodore Roosevelt",
          title: "26th U.S. President"
        },
        {
          quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
          name: "Winston Churchill",
          title: "Former British Prime Minister"
        },
        {
          quote: "Don’t watch the clock; do what it does. Keep going.",
          name: "Sam Levenson",
          title: "Writer & Humorist"
        },
        {
          quote: "You miss 100% of the shots you don’t take.",
          name: "Wayne Gretzky",
          title: "Professional Hockey Player"
        },
        {
          quote: "Hardships often prepare ordinary people for an extraordinary destiny.",
          name: "C.S. Lewis",
          title: "Author"
        },
        {
          quote: "It always seems impossible until it’s done.",
          name: "Nelson Mandela",
          title: "Former President of South Africa"
        },
        {
          quote: "Keep your face always toward the sunshine—and shadows will fall behind you.",
          name: "Walt Whitman",
          title: "Poet"
        },
      ];

      
  return (
    
      <InfiniteMovingCards items={quotes} ></InfiniteMovingCards>
    
    
  )
}

export default Cards
