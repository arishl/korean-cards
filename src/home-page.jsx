import koreanalphabet from './Korean/Alphabet.json'
import koreansentences from './Korean/sentences-1.json'
import koreanwords from './Korean/words.json'
import { useState } from 'react';
import { Button, ButtonGroup,  Text, Box } from '@chakra-ui/react';
import './home-page.css'
import Cookies from 'js-cookie';





function HomePage() {
  if (Cookies.get("level") == null){
    Cookies.set("level",0);
  }
  if (Cookies.get("xp")==null){
    Cookies.set("xp",0)
  }
  const [xp,setXP] = useState(parseInt(Cookies.get("xp")));
  const [level, setLevel] = useState(parseInt(Cookies.get("level")));
  const [options, setOptions] = useState(generateOptions());
  
  
  function generateOptions() {
    const randomIndex = Math.floor(Math.random() * koreanalphabet.characters.length);
    let korean = "";
    let correctEnglish = "";
    let allEnglishOptions = "";
    if (xp >= 100){
      setLevel(level+1)
      Cookies.set("level", level);
      setXP(0);
      Cookies.set("xp",0);
    }
    if (level  >= 2){
      korean = koreansentences.sentences[randomIndex].korean;
      correctEnglish = koreansentences.sentences[randomIndex].english;
      allEnglishOptions = koreansentences.sentences.map(item => item.english);
    }
    else if (level >=1){
      korean = koreanwords.words[randomIndex].korean;
      correctEnglish = koreanwords.words[randomIndex].english;
      allEnglishOptions = koreanwords.words.map(item => item.english);
    }else{
      korean = koreanalphabet.characters[randomIndex].korean;
      correctEnglish = koreanalphabet.characters[randomIndex].english;
      allEnglishOptions = koreanalphabet.characters.map(item => item.english);
    }
    
    const incorrectEnglish = allEnglishOptions
      .filter(option => option !== correctEnglish)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const shuffledOptions = [correctEnglish, ...incorrectEnglish].sort(() => 0.5 - Math.random());
    return { korean, correctEnglish, options: shuffledOptions };
  }
  const speak = (text, language) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = language; // Set language to English
    window.speechSynthesis.speak(speech);
  };

  function handleOptionClick(selectedOption) {
    const isCorrect = selectedOption === options.correctEnglish;
    if (isCorrect) {
      setOptions(generateOptions());
      setXP(xp + 1)
      Cookies.set("level",level)
      speak(options.korean, "ko-KR")
    } else {
      if (xp >= 1){
        setXP(xp - 1)
      }
      speak("부정확한", "ko-KR")
    }
  }
  function handleCharacterClick(selectedOption) {
      speak(selectedOption, "ko-KR")
  }
  const TopButton = () => {

    return (
      <Box textAlign="center" pt={10}>
        <Button
          
          bg="white"
          position="relative"
          _hover={{ bg: "white" }}
          onClick={() => handleCharacterClick(options.korean)} size = "xxl" fontSize="9xl" 
          mb={10}
          mt = {-4}
        >
          {options.korean}
        </Button>
      </Box>
    );
  };
  
  return (
    <Box alignItems="center"  justifyContent="center" display="flex" flexDirection="column">
        <Button padding = {2} _hover="#e56969" bg="#e56969" size="large" mt = {-100}  fontSize="9xl">한국어를 배우다</Button>
        
        <Box bg = "grey" size="large" mt = {4} _hover="grey" pt = {1} pb = {1} pl = {50} pr = {50} >
        <Box  alignItems="center"  justifyContent="center" display="flex" flexDirection="column">
        <TopButton/>
        <ButtonGroup>
          {options.options.map(option => (
            <Button
              key={option}
              onClick={() => handleOptionClick(option)}
              size="large"
              fontSize="4xl"
              py={4}
              px={5}
              bg="pink"
              color="black"
              variant="outline"
              borderColor="pink"
              mr={2}
              ml = {2}
              mb={2}
            >
              {option}
            </Button>
          ))}
        </ButtonGroup>
        </Box>
        </Box>
        <Button pl = {500} pr = {500} _hover="#595454" bg="#595454"  mt = {3}>
        <Box  alignItems="center"  justifyContent="center" display="flex" flexDirection="row">
        <Text mr = {2} size = "small" fontSize="1xl" >Level:  {level}</Text>
        <Text  ml = {2} size = "small" fontSize="1xl" >XP:  {xp}</Text>
        </Box>
        </Button>
        <Button pl = {600} pr = {600} _hover="#595454" bg="#595454"  mt = {3}></Button>
    </Box>
  )
}

export default HomePage
