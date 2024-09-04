import random

def lacrosse_shootout():
    print("Welcome to the Lacrosse Shootout!")
    
    # Choose difficulty level
    print("Choose difficulty level: Easy, Medium, Hard")
    difficulty = input("Enter difficulty: ").lower()
    
    if difficulty == "easy":
        block_chance = 0.25
    elif difficulty == "medium":
        block_chance = 0.5
    elif difficulty == "hard":
        block_chance = 0.75
    else:
        print("Invalid difficulty! Defaulting to Medium.")
        block_chance = 0.5
    
    print(f"\nYou have 5 shots to score as many goals as possible on {difficulty.capitalize()} difficulty.")
    
    shots = 5
    goals = 0
    
    directions = ["high", "low", "left", "right"]
    
    while shots > 0:
        print(f"\nYou have {shots} shots remaining.")
        print("Where do you want to shoot? (high, low, left, right)")
        
        # Get player's choice
        player_choice = input("Enter your choice: ").lower()
        
        if player_choice not in directions:
            print("Invalid choice! Try again.")
            continue
        
        # Randomly decide where the goalie will defend
        goalie_choice = random.choice(directions)
        
        # Determine if the shot is successful based on the difficulty level
        if player_choice == goalie_choice and random.random() < block_chance:
            print(f"The goalie blocked your shot by defending {goalie_choice}!")
        else:
            print(f"You scored by shooting {player_choice}!")
            goals += 1
            
        shots -= 1
    
    # Display the final score
    print(f"\nGame over! You scored {goals} goals out of 5 shots on {difficulty.capitalize()} difficulty.")

# Run the game
lacrosse_shootout()
