using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.Windows.Forms;

namespace WinAppTicTacToe
{
    #region Project Enumerations
    ///<summary>
    /// Enums for clarity and maintainability.
    /// (Set of named constants associated with an integer numeric type)    /// 
    ///</summary>

    // Enumeration representing the gamer and the NPC.
    public enum Player
    {
        None = 0, // Represents an empty cell
        User = 1, // Represents the user's move (X)
        NPC = 2   // Represents the NPC's move (O)
    }

    // Enumeration representing the state of the game.
    public enum GameState
    {
        GameOver = 0, // Represents the end of the game
        Active = 1    // Represents the continuity of the game
    }

    #endregion

    class UnbeatableAIController
    {
        #region Class Members
        ///<summary>
        /// Member Data (Class Attributes).
        ///</summary>
        
        private Player mCurrentPlayerFlag;   // Tracks whose turn it is ("X" or "O")
        private int mMoveCount;              // Tracks the number of moves made
        private GameState mCurrentGameState; // Tracks if the game is active or over
        private Player[] mBoardState;        // Represents the Tic-Tac-Toe board (using Player enum)
        private int mHeuristicSum;           // Stores the sum calculated by the heuristic method         
        private int[] mArrayMoves;           // Represents the player and NPC's moves according to the FSM
        
        // Define constants for cell indices for better readability (used in PlayNPC)
        private const int CENTER_INDEX = 4;
        private static readonly int[] CORNER_INDICES = { 0, 2, 6, 8 };
        private static readonly int[] SIDE_INDICES = { 1, 3, 5, 7 };

        // Define all possible winning lines
        private static readonly int[][] WinningLines = new int[][]
        {
            // Rows
            new int[] { 0, 1, 2 },
            new int[] { 3, 4, 5 },
            new int[] { 6, 7, 8 },
            // Columns
            new int[] { 0, 3, 6 },
            new int[] { 1, 4, 7 },
            new int[] { 2, 5, 8 },
            // Diagonals
            new int[] { 0, 4, 8 },
            new int[] { 2, 4, 6 }
        };

        #endregion

        #region Properties
        ///<summary>
        /// Manage access descriptors (get & set).
        /// Using auto-implemented properties for brevity, if no custom logic is needed
        ///</summary>   
        
        public string Flag
        {
            get => mCurrentPlayerFlag == Player.User ? "X" : "O"; // Convert enum to string for UI
            set => mCurrentPlayerFlag = (value == "X") ? Player.User : Player.NPC;
        }

        public int MoveNumber
        {
            get => mMoveCount;
            set => mMoveCount = value;
        }

        public GameState GameControl
        {
            get => mCurrentGameState;
            set => mCurrentGameState = value;
        }

        public Player[] ArrayMoves // Expose as Player[] instead of int[]
        {
            get => mBoardState;
            set => mBoardState = value;
        }

        #endregion

        #region Constructors of the class
        ///<summary>
        /// Constructor Functions.
        ///</summary>

        // Parameterless constructor.
        public UnbeatableAIController()
        {            
            InitializeGameData(); // Use a single initialization method
        }

        #endregion

        #region Game Control Methods

        /// <summary>
        /// Initializes/resets all game data to a starting state.
        /// </summary>
        public void InitializeGameData()
        {
            mArrayMoves = new int[9];
            for (int i = 0; i < mArrayMoves.Length; i++)
                mArrayMoves[i] = 0;              
            mBoardState = new Player[9];      // Initialize with default Player.None (0)
            mCurrentPlayerFlag = Player.User; // User (X) starts first
            mMoveCount = 0;
            mCurrentGameState = GameState.Active;
            mHeuristicSum = 0;
        }

        /// <summary>
        /// Clears the text of all game board buttons and enables the game board.
        /// </summary>
        /// <param name="listButtons">List of UI buttons representing the board.</param>
        /// <param name="grbTicTacToe">The GroupBox containing the Tic-Tac-Toe board.</param>
        public void InitializeControls(List<Button> listButtons, GroupBox grbTicTacToe)
        {
            foreach (Button button in listButtons)
            {
                button.Text = string.Empty;
            }
            EnableControls(grbTicTacToe); // Renamed for consistency
        }

        /// <summary>
        /// Disables the game board controls.
        /// </summary>
        /// <param name="grbTicTacToe">The GroupBox containing the Tic-Tac-Toe board.</param>
        public void DisableControls(GroupBox grbTicTacToe)
        {
            grbTicTacToe.Enabled = false;
        }

        /// <summary>
        /// Enables the game board controls.
        /// </summary>
        /// <param name="grbTicTacToe">The GroupBox containing the Tic-Tac-Toe board.</param>
        public void EnableControls(GroupBox grbTicTacToe)
        {
            grbTicTacToe.Enabled = true;
        }

        /// <summary>
        /// Checks if there's a winner or a draw and updates game state.
        /// </summary>
        /// <param name="listButtons">List of UI buttons representing the board.</param>
        /// <param name="grbTicTacToe">The GroupBox containing the Tic-Tac-Toe board.</param>
        /// <returns>GameState.GameOver (0) if game ends, GameState.Active (1) otherwise.</returns>
        public GameState CheckWinner(List<Button> listButtons, GroupBox grbTicTacToe)
        {
            foreach (var line in WinningLines)
            {
                // Get the states of the three cells in the current line
                Player cell1 = mBoardState[line[0]];
                Player cell2 = mBoardState[line[1]];
                Player cell3 = mBoardState[line[2]];

                // If all three cells in the line are the same AND not empty
                if (cell1 != Player.None && cell1 == cell2 && cell2 == cell3)
                {
                    MessageBox.Show($"¡Ganó {FlagForPlayer(cell1)}!", "Resultado");
                    DisableControls(grbTicTacToe);
                    return GameState.GameOver;
                }
            }

            // Check for Draw (if all cells are filled and no winner)
            if (mMoveCount == 9) // If 9 moves have been made, the board is full
            {
                MessageBox.Show("¡Empate!", "Resultado");
                DisableControls(grbTicTacToe);
                return GameState.GameOver;
            }

            // Game is still active
            return GameState.Active;
        }

        /// <summary>
        /// Helper to convert Player enum to the corresponding string ("X" or "O").
        /// </summary>
        private string FlagForPlayer(Player player)
        {
            return player == Player.User ? "X" : "O";
        }

        #endregion

        #region Move Handling Methods
        
        /// <summary>
        /// Displays the user's move on the UI and updates the game state.
        /// </summary>
        /// <param name="objectButton">The button the user clicked.</param>
        private void ShowUserMove(Button objectButton)
        {
            objectButton.Text = FlagForPlayer(Player.User); // Use helper for flag
            mBoardState[objectButton.TabIndex] = Player.User; // Update board state with enum
            mMoveCount++;
            mCurrentPlayerFlag = Player.NPC; // Switch to NPC's turn
            mArrayMoves[objectButton.TabIndex] = 1;
        }

        /// <summary>
        /// Allows the user to make a move.
        /// </summary>
        /// <param name="objectButton">The button the user clicked.</param>
        /// <param name="listButtons">List of UI buttons.</param>
        /// <param name="grbTicTacToe">The game's GroupBox.</param>
        /// <returns>True if the move was valid and made, false otherwise.</returns>
        public bool PlayUser(Button objectButton, List<Button> listButtons, GroupBox grbTicTacToe)
        {
            // Only allow move if the button is empty and game is active
            if (objectButton.Text == string.Empty && mCurrentGameState == GameState.Active)
            {
                if (mCurrentPlayerFlag == Player.User)
                {
                    ShowUserMove(objectButton);
                    mCurrentGameState = CheckWinner(listButtons, grbTicTacToe);
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        /// Generates a random move from all available (empty) cells.
        /// </summary>
        /// <param name="listButtons">List of UI buttons (used to get available moves).</param>
        /// <returns>The index of the randomly chosen empty cell.</returns>
        private int GenerateRandomNPCMove(List<Button> ListButtons)
        {
            int index = 0;
            Random RandomNumber = new Random();

            do
            {
                index = RandomNumber.Next(0, 9);
                if (mArrayMoves[index] == 0 && index < mArrayMoves.Length)
                    return index;
            }
            while (true);
        }

        /// <summary>
        /// Displays the NPC's move on the UI and updates the game state.
        /// </summary>
        /// <param name="listButtons">List of UI buttons.</param>
        /// <param name="index">The index of the cell where NPC moved.</param>
        private void ShowNPCMove(List<Button> listButtons, int index)
        {
            listButtons[index].Text = FlagForPlayer(Player.NPC); // Use helper for flag
            mBoardState[index] = Player.NPC; // Update board state with enum
            mMoveCount++;
            mCurrentPlayerFlag = Player.User; // Switch to User's turn
            mArrayMoves[index] = 3;
        }        

        /// <summary>
        /// Implements heuristic logic for the NPC to find winning or blocking moves.
        /// </summary>
        /// <param name="listButtons">List of UI buttons (not directly used here, but passed around).</param>
        /// <returns>The index of the optimal move found by heuristic, or a random move if no heuristic applies.</returns>
        private int HeuristicNumericalMethod(List<Button> ListButtons)
        {
            int index = 0;
            if (mArrayMoves[0] + mArrayMoves[1] + mArrayMoves[2] == 6)
            {
                if (mArrayMoves[0] == 0) index = 0;
                else if (mArrayMoves[1] == 0) index = 1;
                else if (mArrayMoves[2] == 0) index = 2;
                mHeuristicSum = mArrayMoves[0] + mArrayMoves[1] + mArrayMoves[2];
                return index;
            }
            else if (mArrayMoves[3] + mArrayMoves[4] + mArrayMoves[5] == 6)
            {
                if (mArrayMoves[3] == 0) index = 3;
                else if (mArrayMoves[4] == 0) index = 4;
                else if (mArrayMoves[5] == 0) index = 5;
                mHeuristicSum = mArrayMoves[3] + mArrayMoves[4] + mArrayMoves[5];
                return index;
            }
            else if (mArrayMoves[6] + mArrayMoves[7] + mArrayMoves[8] == 6)
            {
                if (mArrayMoves[6] == 0) index = 6;
                else if (mArrayMoves[7] == 0) index = 7;
                else if (mArrayMoves[8] == 0) index = 8;
                mHeuristicSum = mArrayMoves[6] + mArrayMoves[7] + mArrayMoves[8];
                return index;
            }            
            else if (mArrayMoves[0] + mArrayMoves[3] + mArrayMoves[6] == 6)
            {
                if (mArrayMoves[0] == 0) index = 0;
                else if (mArrayMoves[3] == 0) index = 3;
                else if (mArrayMoves[6] == 0) index = 6;
                mHeuristicSum = mArrayMoves[0] + mArrayMoves[3] + mArrayMoves[6];
                return index;
            }
            else if (mArrayMoves[1] + mArrayMoves[4] + mArrayMoves[7] == 6)
            {
                if (mArrayMoves[1] == 0) index = 1;
                else if (mArrayMoves[4] == 0) index = 4;
                else if (mArrayMoves[7] == 0) index = 7;
                mHeuristicSum = mArrayMoves[1] + mArrayMoves[4] + mArrayMoves[7];
                return index;
            }            
            else if (mArrayMoves[2] + mArrayMoves[5] + mArrayMoves[8] == 6)
            {
                if (mArrayMoves[2] == 0) index = 2;
                else if (mArrayMoves[5] == 0) index = 5;
                else if (mArrayMoves[8] == 0) index = 8;
                mHeuristicSum = mArrayMoves[2] + mArrayMoves[5] + mArrayMoves[8];
                return index;
            }
            else if (mArrayMoves[0] + mArrayMoves[4] + mArrayMoves[8] == 6)
            {
                if (mArrayMoves[0] == 0) index = 0;
                else if (mArrayMoves[4] == 0) index = 4;
                else if (mArrayMoves[8] == 0) index = 8;
                mHeuristicSum = mArrayMoves[0] + mArrayMoves[4] + mArrayMoves[8];
                return index;
            }
            else if (mArrayMoves[2] + mArrayMoves[4] + mArrayMoves[6] == 6)
            {
                if (mArrayMoves[2] == 0) index = 2;
                else if (mArrayMoves[4] == 0) index = 4;
                else if (mArrayMoves[6] == 0) index = 6;
                mHeuristicSum = mArrayMoves[2] + mArrayMoves[4] + mArrayMoves[6];
                return index;
            }
            else if (mArrayMoves[0] + mArrayMoves[1] + mArrayMoves[2] == 2)
            {
                if (mArrayMoves[0] == 0) index = 0;
                else if (mArrayMoves[1] == 0) index = 1;
                else if (mArrayMoves[2] == 0) index = 2;
                mHeuristicSum = mArrayMoves[0] + mArrayMoves[1] + mArrayMoves[2];
                return index;
            }
            else if (mArrayMoves[3] + mArrayMoves[4] + mArrayMoves[5] == 2)
            {
                if (mArrayMoves[3] == 0) index = 3;
                else if (mArrayMoves[4] == 0) index = 4;
                else if (mArrayMoves[5] == 0) index = 5;
                mHeuristicSum = mArrayMoves[3] + mArrayMoves[4] + mArrayMoves[5];
                return index;
            }
            else if (mArrayMoves[6] + mArrayMoves[7] + mArrayMoves[8] == 2)
            {
                if (mArrayMoves[6] == 0) index = 6;
                else if (mArrayMoves[7] == 0) index = 7;
                else if (mArrayMoves[8] == 0) index = 8;
                mHeuristicSum = mArrayMoves[6] + mArrayMoves[7] + mArrayMoves[8];
                return index;
            }
            else if (mArrayMoves[0] + mArrayMoves[3] + mArrayMoves[6] == 2)
            {
                if (mArrayMoves[0] == 0) index = 0;
                else if (mArrayMoves[3] == 0) index = 3;
                else if (mArrayMoves[6] == 0) index = 6;
                mHeuristicSum = mArrayMoves[0] + mArrayMoves[3] + mArrayMoves[6];
                return index;
            }
            else if (mArrayMoves[1] + mArrayMoves[4] + mArrayMoves[7] == 2)
            {
                if (mArrayMoves[1] == 0) index = 1;
                else if (mArrayMoves[4] == 0) index = 4;
                else if (mArrayMoves[7] == 0) index = 7;
                mHeuristicSum = mArrayMoves[1] + mArrayMoves[4] + mArrayMoves[7];
                return index;
            }
            else if (mArrayMoves[2] + mArrayMoves[5] + mArrayMoves[8] == 2)
            {
                if (mArrayMoves[2] == 0) index = 2;
                else if (mArrayMoves[5] == 0) index = 5;
                else if (mArrayMoves[8] == 0) index = 8;
                mHeuristicSum = mArrayMoves[2] + mArrayMoves[5] + mArrayMoves[8];
                return index;
            }            
            else if (mArrayMoves[0] + mArrayMoves[4] + mArrayMoves[8] == 2)
            {
                if (mArrayMoves[0] == 0) index = 0;
                else if (mArrayMoves[4] == 0) index = 4;
                else if (mArrayMoves[8] == 0) index = 8;
                mHeuristicSum = mArrayMoves[0] + mArrayMoves[4] + mArrayMoves[8];
                return index;
            }
            else if (mArrayMoves[2] + mArrayMoves[4] + mArrayMoves[6] == 2)
            {
                if (mArrayMoves[2] == 0) index = 2;
                else if (mArrayMoves[4] == 0) index = 4;
                else if (mArrayMoves[6] == 0) index = 6;
                mHeuristicSum = mArrayMoves[2] + mArrayMoves[4] + mArrayMoves[6];
                return index;
            }
            else if (mArrayMoves[0] + mArrayMoves[4] + mArrayMoves[8] == 5)
            {
                if (mArrayMoves[2] == 0) index = 2;
                else if (mArrayMoves[6] == 0) index = 6;
                else
                    index = GenerateRandomNPCMove(ListButtons);
                mHeuristicSum = 5;
                return index;
            }
            else if (mArrayMoves[2] + mArrayMoves[4] + mArrayMoves[6] == 5)
            {
                if (mArrayMoves[0] == 0) index = 0;
                else if (mArrayMoves[8] == 0) index = 8;
                else
                    index = GenerateRandomNPCMove(ListButtons);
                mHeuristicSum = 5;
                return index;
            }
            else if ((mArrayMoves[1] + mArrayMoves[3] == 2) && (mArrayMoves[0] == 0))
            {
                mHeuristicSum = 2;
                index = CORNER_INDICES[0];
                return index;
            }
            else if ((mArrayMoves[1] + mArrayMoves[5] == 2) && (mArrayMoves[2] == 0))
            {
                mHeuristicSum = 2;
                index = CORNER_INDICES[1];
                return index;
            }
            else if ((mArrayMoves[3] + mArrayMoves[7] == 2) && (mArrayMoves[6] == 0))
            {
                mHeuristicSum = 2;
                index = CORNER_INDICES[2];
                return index;
            }
            else if ((mArrayMoves[5] + mArrayMoves[7] == 2) && (mArrayMoves[8] == 0))
            {
                mHeuristicSum = 2;
                index = CORNER_INDICES[3];
                return index;
            }            
            else
            {
                index = GenerateRandomNPCMove(ListButtons);
                return index;
            }
        }

        /// <summary>
        /// Orchestrates the NPC's turn, choosing the best move based on heuristics or randomness.
        /// </summary>
        /// <param name="listButtons">The list of UI buttons representing the game board.</param>
        /// <param name="grbTicTacToe">The GroupBox containing the Tic-Tac-Toe board.</param>
        public void PlayNPC(List<Button> ListButtons, GroupBox grbTicTacToe)
        {
            int index;
            Random RandomNumber = new Random();

            if (mCurrentGameState == GameState.Active)
            {
                if (MoveNumber == 1)
                {
                    if (mArrayMoves[4] == 0)
                    {
                        index = CENTER_INDEX;
                        ShowNPCMove(ListButtons, index);
                        mCurrentGameState = CheckWinner(ListButtons, grbTicTacToe);
                        return;
                    }
                    do
                    {
                        index = RandomNumber.Next(0, 9);
                        if (mArrayMoves[index] == 0 && 
                           (index == CORNER_INDICES[0] || index == CORNER_INDICES[1] || 
                            index == CORNER_INDICES[2] || index == CORNER_INDICES[3]))
                        {
                            ShowNPCMove(ListButtons, index);
                            mCurrentGameState = CheckWinner(ListButtons, grbTicTacToe);
                            return;
                        }
                    } while (true);
                }
                else // (MoveNumber != 1)
                {
                    if (mArrayMoves[4] == 0)
                    {
                        index = CENTER_INDEX;
                        ShowNPCMove(ListButtons, index);
                        mCurrentGameState = CheckWinner(ListButtons, grbTicTacToe);
                        return;
                    }
                    else
                    {
                        index = HeuristicNumericalMethod(ListButtons);
                        if (mArrayMoves[4] == 3 && mHeuristicSum == 5)
                        {
                            do
                            {
                                index = RandomNumber.Next(0, 9);
                                if (mArrayMoves[index] == 0 && 
                                   (index == SIDE_INDICES[0] || index == SIDE_INDICES[0] || 
                                    index == SIDE_INDICES[2] || index == SIDE_INDICES[3]))
                                {
                                    ShowNPCMove(ListButtons, index);
                                    mCurrentGameState = CheckWinner(ListButtons, grbTicTacToe);
                                    return;
                                }
                            } while (true);
                        }
                        ShowNPCMove(ListButtons, index);
                        mCurrentGameState = CheckWinner(ListButtons, grbTicTacToe);
                        return;
                    }
                }
            }
            else
                return;
        }

        #endregion
    }
}