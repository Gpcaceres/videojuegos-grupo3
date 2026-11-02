using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using TicTacToeGameLibrary;
// DLLs -> System -> Windows

namespace TicTacToeGameForms
{
    public partial class frmTicTacToe : Form
    {
        private List<Button> ListButtons = new List<Button>();

        private ControlTwoUsers ObjectControlTwoUsers = new ControlTwoUsers();
        private ControlRandomMoves ObjectControlRandomMoves = new ControlRandomMoves();
        private ControlWeakIntelligentMoves ObjectControlWeakIntelligentMoves = new ControlWeakIntelligentMoves();
        private ControlStrongIntelligentMoves ObjectControlStrongIntelligentMoves = new ControlStrongIntelligentMoves();

        public frmTicTacToe()
        {
            InitializeComponent();
            InsertDataList();
        }

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

        private void InitializeGame()
        {
            if (GlobalClassGame.GameLevel == 0)
            {
                ObjectControlTwoUsers.InitializeData();
                ObjectControlTwoUsers.InitializeControls(ListButtons, grbTicTacToe);
            }
            else if (GlobalClassGame.GameLevel == 1)
            {
                ObjectControlRandomMoves.InitializeData();
                ObjectControlRandomMoves.InitializeControls(ListButtons, grbTicTacToe);
            }
            else if (GlobalClassGame.GameLevel == 2)
            {
                ObjectControlWeakIntelligentMoves.InitializeData();
                ObjectControlWeakIntelligentMoves.InitializeControls(ListButtons, grbTicTacToe);
            }
            else if (GlobalClassGame.GameLevel == 3)
            {
                ObjectControlStrongIntelligentMoves.InitializeData();
                ObjectControlStrongIntelligentMoves.InitializeControls(ListButtons, grbTicTacToe);
            }
        }

        private void frmTicTacToe_Load(object sender, EventArgs e)
        {
            InitializeGame();
        }

        private void rdbTwoGamers_CheckedChanged(object sender, EventArgs e)
        {
            GlobalClassGame.GameLevel = 0;
            InitializeGame();
        }

        private void rdbBeginner_CheckedChanged(object sender, EventArgs e)
        {
            GlobalClassGame.GameLevel = 1;
            InitializeGame();
        }

        private void rdbHard_CheckedChanged(object sender, EventArgs e)
        {
            GlobalClassGame.GameLevel = 2;
            InitializeGame();
        }

        private void rdbExpert_CheckedChanged(object sender, EventArgs e)
        {
            GlobalClassGame.GameLevel = 3;
            InitializeGame();
        }

        // TabIndex: 0
        private void btnTicTacToe1_Click(object sender, EventArgs e)
        {
            //ObjectControlTwoUsers.MarkButton(btnTicTacToe1);
            //ObjectControlTwoUsers.CheckWinner(ListButtons, grbTicTacToe);
            if (GlobalClassGame.GameLevel == 0)
            {
                ObjectControlTwoUsers.MarkButton(btnTicTacToe1);
                ObjectControlTwoUsers.CheckWinner(ListButtons, grbTicTacToe);
            }
            else if (GlobalClassGame.GameLevel == 1)
            {
                GlobalClassGame.ControlPlayer = ObjectControlRandomMoves.PlayUser(btnTicTacToe1, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlRandomMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 2)
            {
                GlobalClassGame.ControlPlayer = ObjectControlWeakIntelligentMoves.PlayUser(btnTicTacToe1, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlWeakIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 3)
            {
                GlobalClassGame.ControlPlayer = ObjectControlStrongIntelligentMoves.PlayUser(btnTicTacToe1, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlStrongIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
        }

        // TabIndex: 1
        private void btnTicTacToe2_Click(object sender, EventArgs e)
        {
            if (GlobalClassGame.GameLevel == 0)
            {
                ObjectControlTwoUsers.MarkButton(btnTicTacToe2);
                ObjectControlTwoUsers.CheckWinner(ListButtons, grbTicTacToe);
            }
            else if (GlobalClassGame.GameLevel == 1)
            {
                GlobalClassGame.ControlPlayer = ObjectControlRandomMoves.PlayUser(btnTicTacToe2, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlRandomMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 2)
            {
                GlobalClassGame.ControlPlayer = ObjectControlWeakIntelligentMoves.PlayUser(btnTicTacToe2, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlWeakIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 3)
            {
                GlobalClassGame.ControlPlayer = ObjectControlStrongIntelligentMoves.PlayUser(btnTicTacToe2, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlStrongIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
        }

        // TabIndex: 2
        private void btnTicTacToe3_Click(object sender, EventArgs e)
        {
            if (GlobalClassGame.GameLevel == 0)
            {
                ObjectControlTwoUsers.MarkButton(btnTicTacToe3);
                ObjectControlTwoUsers.CheckWinner(ListButtons, grbTicTacToe);
            }
            else if (GlobalClassGame.GameLevel == 1)
            {
                GlobalClassGame.ControlPlayer = ObjectControlRandomMoves.PlayUser(btnTicTacToe3, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlRandomMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 2)
            {
                GlobalClassGame.ControlPlayer = ObjectControlWeakIntelligentMoves.PlayUser(btnTicTacToe3, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlWeakIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 3)
            {
                GlobalClassGame.ControlPlayer = ObjectControlStrongIntelligentMoves.PlayUser(btnTicTacToe3, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlStrongIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
        }

        // TabIndex: 3
        private void btnTicTacToe4_Click(object sender, EventArgs e)
        {
            if (GlobalClassGame.GameLevel == 0)
            {
                ObjectControlTwoUsers.MarkButton(btnTicTacToe4);
                ObjectControlTwoUsers.CheckWinner(ListButtons, grbTicTacToe);
            }
            else if (GlobalClassGame.GameLevel == 1)
            {
                GlobalClassGame.ControlPlayer = ObjectControlRandomMoves.PlayUser(btnTicTacToe4, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlRandomMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 2)
            {
                GlobalClassGame.ControlPlayer = ObjectControlWeakIntelligentMoves.PlayUser(btnTicTacToe4, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlWeakIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 3)
            {
                GlobalClassGame.ControlPlayer = ObjectControlStrongIntelligentMoves.PlayUser(btnTicTacToe4, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlStrongIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
        }

        // TabIndex: 4
        private void btnTicTacToe5_Click(object sender, EventArgs e)
        {
            if (GlobalClassGame.GameLevel == 0)
            {
                ObjectControlTwoUsers.MarkButton(btnTicTacToe5);
                ObjectControlTwoUsers.CheckWinner(ListButtons, grbTicTacToe);
            }
            else if (GlobalClassGame.GameLevel == 1)
            {
                GlobalClassGame.ControlPlayer = ObjectControlRandomMoves.PlayUser(btnTicTacToe5, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlRandomMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 2)
            {
                GlobalClassGame.ControlPlayer = ObjectControlWeakIntelligentMoves.PlayUser(btnTicTacToe5, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlWeakIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 3)
            {
                GlobalClassGame.ControlPlayer = ObjectControlStrongIntelligentMoves.PlayUser(btnTicTacToe5, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlStrongIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
        }

        // TabIndex: 5
        private void btnTicTacToe6_Click(object sender, EventArgs e)
        {
            if (GlobalClassGame.GameLevel == 0)
            {
                ObjectControlTwoUsers.MarkButton(btnTicTacToe6);
                ObjectControlTwoUsers.CheckWinner(ListButtons, grbTicTacToe);
            }
            else if (GlobalClassGame.GameLevel == 1)
            {
                GlobalClassGame.ControlPlayer = ObjectControlRandomMoves.PlayUser(btnTicTacToe6, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlRandomMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 2)
            {
                GlobalClassGame.ControlPlayer = ObjectControlWeakIntelligentMoves.PlayUser(btnTicTacToe6, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlWeakIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 3)
            {
                GlobalClassGame.ControlPlayer = ObjectControlStrongIntelligentMoves.PlayUser(btnTicTacToe6, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlStrongIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
        }

        // TabIndex: 6
        private void btnTicTacToe7_Click(object sender, EventArgs e)
        {
            if (GlobalClassGame.GameLevel == 0)
            {
                ObjectControlTwoUsers.MarkButton(btnTicTacToe7);
                ObjectControlTwoUsers.CheckWinner(ListButtons, grbTicTacToe);
            }
            else if (GlobalClassGame.GameLevel == 1)
            {
                GlobalClassGame.ControlPlayer = ObjectControlRandomMoves.PlayUser(btnTicTacToe7, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlRandomMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 2)
            {
                GlobalClassGame.ControlPlayer = ObjectControlWeakIntelligentMoves.PlayUser(btnTicTacToe7, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlWeakIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 3)
            {
                GlobalClassGame.ControlPlayer = ObjectControlStrongIntelligentMoves.PlayUser(btnTicTacToe7, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlStrongIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
        }

        // TabIndex: 7
        private void btnTicTacToe8_Click(object sender, EventArgs e)
        {
            if (GlobalClassGame.GameLevel == 0)
            {
                ObjectControlTwoUsers.MarkButton(btnTicTacToe8);
                ObjectControlTwoUsers.CheckWinner(ListButtons, grbTicTacToe);
            }
            else if (GlobalClassGame.GameLevel == 1)
            {
                GlobalClassGame.ControlPlayer = ObjectControlRandomMoves.PlayUser(btnTicTacToe8, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlRandomMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 2)
            {
                GlobalClassGame.ControlPlayer = ObjectControlWeakIntelligentMoves.PlayUser(btnTicTacToe8, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlWeakIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 3)
            {
                GlobalClassGame.ControlPlayer = ObjectControlStrongIntelligentMoves.PlayUser(btnTicTacToe8, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlStrongIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
        }

        // TabIndex: 8
        private void btnTicTacToe9_Click(object sender, EventArgs e)
        {
            if (GlobalClassGame.GameLevel == 0)
            {
                ObjectControlTwoUsers.MarkButton(btnTicTacToe9);
                ObjectControlTwoUsers.CheckWinner(ListButtons, grbTicTacToe);
            }
            else if (GlobalClassGame.GameLevel == 1)
            {
                GlobalClassGame.ControlPlayer = ObjectControlRandomMoves.PlayUser(btnTicTacToe9, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlRandomMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 2)
            {
                GlobalClassGame.ControlPlayer = ObjectControlWeakIntelligentMoves.PlayUser(btnTicTacToe9, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlWeakIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
            else if (GlobalClassGame.GameLevel == 3)
            {
                GlobalClassGame.ControlPlayer = ObjectControlStrongIntelligentMoves.PlayUser(btnTicTacToe9, ListButtons, grbTicTacToe);
                if (GlobalClassGame.ControlPlayer == true)
                {
                    ObjectControlStrongIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
                }
            }
        }

        private void btnNew_Click(object sender, EventArgs e)
        {
            InitializeGame();
        }

        private void btnExit_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void mnuFileNew_Click(object sender, EventArgs e)
        {
            InitializeGame();
        }

        private void mnuFileExit_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void mnuHelpAbout_Click(object sender, EventArgs e)
        {

        }

        private void mnuHelpContent_Click(object sender, EventArgs e)
        {

        }

        private void mnuViewScores_Click(object sender, EventArgs e)
        {

        }

        private void mnuViewResetScores_Click(object sender, EventArgs e)
        {

        }
    }
}
