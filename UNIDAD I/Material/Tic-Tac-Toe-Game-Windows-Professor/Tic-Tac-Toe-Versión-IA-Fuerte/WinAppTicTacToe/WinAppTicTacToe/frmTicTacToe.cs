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
        private List<Button> ListButtons = new List<Button>();                
        private UnbeatableAIController UnbeatableAI = new UnbeatableAIController();
        private static bool ControlPlayer;

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
            UnbeatableAI.InitializeGameData();
            UnbeatableAI.InitializeControls(ListButtons, grbTicTacToe);
        }

        private void frmTicTacToe_Load(object sender, EventArgs e)
        {
            InitializeGame();
        }

        private void btnTicTacToe1_Click(object sender, EventArgs e)
        {
            ControlPlayer = UnbeatableAI.PlayUser(btnTicTacToe1, ListButtons, grbTicTacToe);
            if (ControlPlayer == true)
            {
                UnbeatableAI.PlayNPC(ListButtons, grbTicTacToe);
            }
        }

        private void btnTicTacToe2_Click(object sender, EventArgs e)
        {
            ControlPlayer = UnbeatableAI.PlayUser(btnTicTacToe2, ListButtons, grbTicTacToe);
            if (ControlPlayer == true)
            {
                UnbeatableAI.PlayNPC(ListButtons, grbTicTacToe);
            }
        }

        private void btnTicTacToe3_Click(object sender, EventArgs e)
        {
            ControlPlayer = UnbeatableAI.PlayUser(btnTicTacToe3, ListButtons, grbTicTacToe);
            if (ControlPlayer == true)
            {
                UnbeatableAI.PlayNPC(ListButtons, grbTicTacToe);
            }
        }

        private void btnTicTacToe4_Click(object sender, EventArgs e)
        {
            ControlPlayer = UnbeatableAI.PlayUser(btnTicTacToe4, ListButtons, grbTicTacToe);
            if (ControlPlayer == true)
            {
                UnbeatableAI.PlayNPC(ListButtons, grbTicTacToe);
            }
        }

        private void btnTicTacToe5_Click(object sender, EventArgs e)
        {
            ControlPlayer = UnbeatableAI.PlayUser(btnTicTacToe5, ListButtons, grbTicTacToe);
            if (ControlPlayer == true)
            {
                UnbeatableAI.PlayNPC(ListButtons, grbTicTacToe);
            }
        }

        private void btnTicTacToe6_Click(object sender, EventArgs e)
        {
            ControlPlayer = UnbeatableAI.PlayUser(btnTicTacToe6, ListButtons, grbTicTacToe);
            if (ControlPlayer == true)
            {
                UnbeatableAI.PlayNPC(ListButtons, grbTicTacToe);
            }
        }

        private void btnTicTacToe7_Click(object sender, EventArgs e)
        {
            ControlPlayer = UnbeatableAI.PlayUser(btnTicTacToe7, ListButtons, grbTicTacToe);
            if (ControlPlayer == true)
            {
                UnbeatableAI.PlayNPC(ListButtons, grbTicTacToe);
            }
        }

        private void btnTicTacToe8_Click(object sender, EventArgs e)
        {
            ControlPlayer = UnbeatableAI.PlayUser(btnTicTacToe8, ListButtons, grbTicTacToe);
            if (ControlPlayer == true)
            {
                UnbeatableAI.PlayNPC(ListButtons, grbTicTacToe);
            }
        }

        private void btnTicTacToe9_Click(object sender, EventArgs e)
        {
            ControlPlayer = UnbeatableAI.PlayUser(btnTicTacToe9, ListButtons, grbTicTacToe);
            if (ControlPlayer == true)
            {
                UnbeatableAI.PlayNPC(ListButtons, grbTicTacToe);
            }
        }

        private void btnNew_Click(object sender, EventArgs e)
        {
            InitializeGame();
        }

        private void btnExit_Click(object sender, EventArgs e)
        {
            Close();
        }
    }
}
