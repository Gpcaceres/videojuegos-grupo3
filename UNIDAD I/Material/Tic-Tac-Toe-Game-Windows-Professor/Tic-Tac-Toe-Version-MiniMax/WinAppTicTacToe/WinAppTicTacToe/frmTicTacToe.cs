using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WinAppTicTacToe
{
    public partial class frmTicTacToe : Form
    {
        private Button[] buttons = new Button[9];
        private char[,] board = new char[3, 3];
        private UnbeatableAIController aiController;
        private bool isHumanTurn = true;
        private bool isGameOver = false;

        //private List<Button> ListButtons = new List<Button>();                
        //private UnbeatableAIController UnbeatableAI = new UnbeatableAIController();
        //private static bool ControlPlayer;

        public frmTicTacToe()
        {
            InitializeComponent();
            aiController = new UnbeatableAIController();
            InitializeGame();
            //InsertDataList();
        }

        /*
        private void InsertDataList()
        {
            // Lista enlazada con 9 nodos (array dinámico de objetos).
            ListButtons.Add(btnTicTacToe1); //nodo 0
            ListButtons.Add(btnTicTacToe2); //nodo 1
            ListButtons.Add(btnTicTacToe3); //nodo 2
            ListButtons.Add(btnTicTacToe4); //nodo 3
            ListButtons.Add(btnTicTacToe5); //nodo 4
            ListButtons.Add(btnTicTacToe6); //nodo 5
            ListButtons.Add(btnTicTacToe7); //nodo 6
            ListButtons.Add(btnTicTacToe8); //nodo 7
            ListButtons.Add(btnTicTacToe9); //nodo 8
        }
        */

        private void InitializeGame()
        {
            // Assign 9 buttons from the interface into the array
            // Assumes buttons are named button1, button2, ..., button9 on the designer
            buttons[0] = btnTicTacToe1;
            buttons[1] = btnTicTacToe2;
            buttons[2] = btnTicTacToe3;
            buttons[3] = btnTicTacToe4;
            buttons[4] = btnTicTacToe5;
            buttons[5] = btnTicTacToe6;
            buttons[6] = btnTicTacToe7;
            buttons[7] = btnTicTacToe8;
            buttons[8] = btnTicTacToe9;

            for (int i = 0; i < 9; i++)
            {
                int index = i;
                buttons[i].Click += (sender, e) => OnButtonClick(index);
            }

            ResetBoard();
        }

        private void ResetBoard()
        {
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    board[i, j] = ' ';
                }
            }

            foreach (var btn in buttons)
            {
                if (btn != null)
                {
                    btn.Text = "";
                    btn.Enabled = true;
                }
            }

            isHumanTurn = true;
            isGameOver = false;
        }

        private void OnButtonClick(int index)
        {
            if (isGameOver || !isHumanTurn) return;

            int row = index / 3;
            int col = index % 3;

            if (board[row, col] == ' ')
            {
                MakeMove(index, 'X');

                if (CheckGameEnd()) return;

                isHumanTurn = false;
                AIMove();
            }
        }

        private void AIMove()
        {
            if (isGameOver) return;

            int bestMove = aiController.GetBestMove(board);
            if (bestMove != -1)
            {
                MakeMove(bestMove, 'O');
                CheckGameEnd();
            }

            isHumanTurn = true;
        }

        private void MakeMove(int index, char player)
        {
            int row = index / 3;
            int col = index % 3;

            board[row, col] = player;
            buttons[index].Text = player.ToString();
            buttons[index].Enabled = false;
        }

        private bool CheckGameEnd()
        {
            if (CheckWin('X'))
            {
                MessageBox.Show("You Win!", "Tic Tac Toe");
                isGameOver = true;
                return true;
            }

            if (CheckWin('O'))
            {
                MessageBox.Show("AI Wins!", "Tic Tac Toe");
                isGameOver = true;
                return true;
            }

            if (IsBoardFull())
            {
                MessageBox.Show("It's a Draw!", "Tic Tac Toe");
                isGameOver = true;
                return true;
            }

            return false;
        }

        private bool CheckWin(char player)
        {
            for (int i = 0; i < 3; i++)
            {
                if (board[i, 0] == player && board[i, 1] == player && board[i, 2] == player) return true;
                if (board[0, i] == player && board[1, i] == player && board[2, i] == player) return true;
            }

            if (board[0, 0] == player && board[1, 1] == player && board[2, 2] == player) return true;
            if (board[0, 2] == player && board[1, 1] == player && board[2, 0] == player) return true;

            return false;
        }

        private bool IsBoardFull()
        {
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    if (board[i, j] == ' ') return false;
                }
            }
            return true;
        }

        /*
        private void InitializeGame()
        {
            
        }
        */

        private void frmTicTacToe_Load(object sender, EventArgs e)
        {
            //InitializeGame();
        }

        private void btnTicTacToe1_Click(object sender, EventArgs e)
        {
            
        }

        private void btnTicTacToe2_Click(object sender, EventArgs e)
        {
            
        }

        private void btnTicTacToe3_Click(object sender, EventArgs e)
        {
            
        }

        private void btnTicTacToe4_Click(object sender, EventArgs e)
        {
            
        }

        private void btnTicTacToe5_Click(object sender, EventArgs e)
        {
            
        }

        private void btnTicTacToe6_Click(object sender, EventArgs e)
        {
            
        }

        private void btnTicTacToe7_Click(object sender, EventArgs e)
        {
            
        }

        private void btnTicTacToe8_Click(object sender, EventArgs e)
        {
            
        }

        private void btnTicTacToe9_Click(object sender, EventArgs e)
        {
            
        }

        private void btnNew_Click(object sender, EventArgs e)
        {
            ResetBoard();
            //InitializeGame();
        }

        private void btnExit_Click(object sender, EventArgs e)
        {
            Close();
        }
    }
}
