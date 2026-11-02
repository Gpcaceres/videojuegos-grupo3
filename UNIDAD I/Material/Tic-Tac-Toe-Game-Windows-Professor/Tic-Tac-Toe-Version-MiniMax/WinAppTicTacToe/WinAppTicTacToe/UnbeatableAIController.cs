using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.Windows.Forms;

namespace WinAppTicTacToe
{    
    class UnbeatableAIController
    {
        private const char AI_PLAYER = 'O';
        private const char HUMAN_PLAYER = 'X';
        private const char EMPTY = ' ';

        public int GetBestMove(char[,] board)
        {
            int bestScore = int.MinValue;
            int bestMove = -1;

            for (int i = 0; i < 9; i++)
            {
                int row = i / 3;
                int col = i % 3;

                if (board[row, col] == EMPTY)
                {
                    board[row, col] = AI_PLAYER;
                    int score = Minimax(board, 0, false);
                    board[row, col] = EMPTY;

                    if (score > bestScore)
                    {
                        bestScore = score;
                        bestMove = i;
                    }
                }
            }

            return bestMove;
        }

        private int Minimax(char[,] board, int depth, bool isMaximizing)
        {
            int score = EvaluateBoard(board);

            if (score == 10) return score - depth;
            if (score == -10) return score + depth;
            if (!IsMovesLeft(board)) return 0;

            if (isMaximizing)
            {
                int best = int.MinValue;
                for (int i = 0; i < 3; i++)
                {
                    for (int j = 0; j < 3; j++)
                    {
                        if (board[i, j] == EMPTY)
                        {
                            board[i, j] = AI_PLAYER;
                            best = Math.Max(best, Minimax(board, depth + 1, false));
                            board[i, j] = EMPTY;
                        }
                    }
                }
                return best;
            }
            else
            {
                int best = int.MaxValue;
                for (int i = 0; i < 3; i++)
                {
                    for (int j = 0; j < 3; j++)
                    {
                        if (board[i, j] == EMPTY)
                        {
                            board[i, j] = HUMAN_PLAYER;
                            best = Math.Min(best, Minimax(board, depth + 1, true));
                            board[i, j] = EMPTY;
                        }
                    }
                }
                return best;
            }
        }

        private int EvaluateBoard(char[,] board)
        {
            // Check Rows
            for (int row = 0; row < 3; row++)
            {
                if (board[row, 0] == board[row, 1] && board[row, 1] == board[row, 2])
                {
                    if (board[row, 0] == AI_PLAYER) return 10;
                    if (board[row, 0] == HUMAN_PLAYER) return -10;
                }
            }

            // Check Columns
            for (int col = 0; col < 3; col++)
            {
                if (board[0, col] == board[1, col] && board[1, col] == board[2, col])
                {
                    if (board[0, col] == AI_PLAYER) return 10;
                    if (board[0, col] == HUMAN_PLAYER) return -10;
                }
            }

            // Check Diagonals
            if (board[0, 0] == board[1, 1] && board[1, 1] == board[2, 2])
            {
                if (board[0, 0] == AI_PLAYER) return 10;
                if (board[0, 0] == HUMAN_PLAYER) return -10;
            }

            if (board[0, 2] == board[1, 1] && board[1, 1] == board[2, 0])
            {
                if (board[0, 2] == AI_PLAYER) return 10;
                if (board[0, 2] == HUMAN_PLAYER) return -10;
            }

            return 0;
        }

        private bool IsMovesLeft(char[,] board)
        {
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    if (board[i, j] == EMPTY) return true;
                }
            }
            return false;
        }
    }
}