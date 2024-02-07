import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet ,TouchableOpacity} from 'react-native';
import questions from './data/questions.json';
import Confetti from 'react-confetti'

export default function App() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = () => {
    const random = Math.floor(Math.random() * 20) + 1;
    console.log('random',random)
    const question = questions[random-1];
    question.answers = shuffleArray(question.answers);
    setCurrentQuestion(question);
    setCorrect(false)
  };
  const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

  const handleAnswerPress = (answer: string) => {
    // จัดการคำตอบที่เลือก
    if(currentQuestion.correct == answer){
      setScore((score)=>score+1)
      setCorrect(true)
      setTimeout(() => {
        loadQuestion()
      }, 5000);

    }else{
      loadQuestion()
    }
  

  
  };

  return (
    <View style={styles.container}>

<Text style={styles.score}>{score}</Text>
{correct&&<Confetti />}
      {currentQuestion && (
        <>
          <Text style={styles.title}>{currentQuestion.question}</Text>
          <View style={styles.list}>
          {currentQuestion.answers.map((answer, index) => (

            <TouchableOpacity
            onPress={() => handleAnswerPress(answer)}
            key={index}
            style={styles.button} // ใส่สไตล์ตามที่ต้องการ
            disabled={correct}
          >
            <Text style={styles.text}>{answer}</Text>
          </TouchableOpacity> 
          ))}
             </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{ 
    backgroundColor: '#3a3a3a',
    padding: 10,
    borderRadius: 5,
    marginBottom:10, 
  },
  text:{
    color: '#ffffff',
  },
  title:{
    color: '#7e7e7e',
    fontSize:50,
    marginBottom:40
  },
  list:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-around',
    width:'100%',
    alignItems:'center'
  },
  score:{
    position:'absolute',
    top:0,
    right:10,
    color: '#7e7e7e',
    fontSize:40,
    marginBottom:30
  }
});
