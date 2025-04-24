import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [dice, setDice] = useState<number[]>([]);
	const [pow, setPow] = useState(0);
	const [arm, setArm] = useState(0);
	const [options, setOptions] = useState<number[]>([]);
	const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

	useEffect(() => {
		generateQuestion();
	}, []);

	const generateQuestion = () => {
		const diceCount = Math.random() < 0.5 ? 2 : 3;
		const newDice = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1);
		const newPow = Math.floor(Math.random() * 10) + 10; // Random pow between 10 and 19
		const newArm = Math.floor(Math.random() * 10) + 15; // Random arm between 15 and 24
		const result = newPow + newDice.reduce((a, b) => a + b, 0) - newArm;

		const newOptions = [result, result + Math.floor(Math.random() * 3) + 1, result - Math.floor(Math.random() * 3) - 1].sort(() => Math.random() - 0.5);

		setDice(newDice);
		setPow(newPow);
		setArm(newArm);
		setOptions(newOptions);
		setCorrectAnswer(result);
		setSelectedAnswer(null);
	};

	const handleAnswerClick = (answer: number) => {
		setSelectedAnswer(answer);
		if (answer === correctAnswer) {
			setTimeout(() => generateQuestion(), 2000);
		}
	};

	return (
		<div className="App">
			<h1>Warmachine Dice Math Practice</h1>
			<div className="dice-container">
				{dice.map((value, index) => (
					<div
						key={index}
						className="dice"
					>
						{Array.from({ length: value }).map((_, i) => "•")}
					</div>
				))}
			</div>
			<p>
				POW {pow} vs ARM {arm}
			</p>
			<div className="options">
				{options.map((option, index) => (
					<button
						key={index}
						onClick={() => handleAnswerClick(option)}
						style={{
							backgroundColor: selectedAnswer === option ? (option === correctAnswer ? "green" : "red") : "white",
						}}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
}

export default App;
