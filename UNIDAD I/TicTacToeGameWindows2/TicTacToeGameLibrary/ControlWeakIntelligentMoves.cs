using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.Windows.Forms;


namespace TicTacToeGameLibrary
{
    public class ControlWeakIntelligentMoves
    {
        #region Atributes of the class
        ///<summary>
        /// Member data (variables).
        ///</summary>

        private string mFlag; // Bandera - Semáforo - X o 0
        private int mMoveNumber; // Nivel del Juego (Rama del Árbol de conocimientos)
        private int mGameControl; // Switch ON - OFF del NPC
        private int[] mArrayMoves = new int[9]; // Máquina de estados finitos - SFM.       

        // Árbol de Conocimientos - Jugadas
        // Se selecciona una rama (uno de los casos)
        //BBB
        //BBB
        //BBB
        //Nivel 0

        //BBB
        //BXB
        //BBB
        //Nivel 1

        //BB0
        //BXB
        //BBB
        //Nivel 2

        //XB0
        //BXB
        //BBB
        //Nivel 3

        //XB0
        //BXB
        //BB0
        //Nivel 4

        //XB0
        //BXB
        //XB0
        //Nivel 5

        //XB0
        //BX0
        //XB0
        //Nivel 6       

        // Máquina de Estados Finitos
        // BLANK -> VACIO -> 0
        // USER -> X -> 1
        // NPC -> 0  -> 3

        #endregion

        #region Properties
        ///<summary>
        /// Manage access descriptors (get & set).
        ///</summary>

        public string Flag
        {
            get { return mFlag; }
            set { mFlag = value; }
        }

        public int MoveNumber
        {
            get { return mMoveNumber; }
            set { mMoveNumber = value; }
        }

        public int GameControl
        {
            get { return mGameControl; }
            set { mGameControl = value; }
        }

        public int[] ArrayMoves
        {
            get { return mArrayMoves; }
            set { mArrayMoves = value; }
        }

        #endregion

        #region Constructors of the class
        ///<summary>
        /// Constructors Functions.
        ///</summary>

        // Constructor by defect.
        public ControlWeakIntelligentMoves()
        {
            // i:               0,1,2,3,4,5,6,7,8
            // mArrayMoves[] = {0,0,0,0,0,0,0,0,0}
            for (int i = 0; i < mArrayMoves.Length; i++)
                mArrayMoves[i] = 0;

            mFlag = "X";
            mMoveNumber = 0;
            mGameControl = 0;
            // mGameControl = 0; -> significa que puede jugar el NPC
            // mGameControl = 1; -> significa que para de jugar el NPC
        }

        #endregion

        #region Methods
        ///<summary>
        /// Member functions.
        ///</summary>

        public void InitializeData()
        {
            // i:               0,1,2,3,4,5,6,7,8
            // mArrayMoves[] = {0,0,0,0,0,0,0,0,0}
            for (int i = 0; i < mArrayMoves.Length; i++)
                mArrayMoves[i] = 0;

            mFlag = "X";
            mMoveNumber = 0;
            mGameControl = 0;
            // mGameControl = 0; -> significa que puede jugar el NPC
            // mGameControl = 1; -> significa que para de jugar el NPC
        }

        public void InitializeControls(List<Button> ListButtons,
                                         GroupBox grbTicTacToe)
        {
            // Borrar el texto de cada botón que está ubicado en cada nodo
            // de la lista enlazada.
            for (int i = 0; i < ListButtons.Count; i++)
                ListButtons[i].Text = "";

            EnabledControls(grbTicTacToe);
        }

        public void DisabledControls(GroupBox grbTicTacToe)
        {
            grbTicTacToe.Enabled = false;
        }

        public void EnabledControls(GroupBox grbTicTacToe)
        {
            grbTicTacToe.Enabled = true;
        }

        public int CheckWinner(List<Button> ListButtons,
                                GroupBox grbTicTacToe)
        {
            if (ListButtons[0].Text == ListButtons[1].Text && ListButtons[1].Text == ListButtons[2].Text && ListButtons[2].Text == "0")
            {
                MessageBox.Show("Ganó " + ListButtons[2].Text, "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            else if (ListButtons[3].Text == ListButtons[4].Text && ListButtons[4].Text == ListButtons[5].Text && ListButtons[5].Text == "0")
            {
                MessageBox.Show("Ganó " + ListButtons[5].Text, "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            else if (ListButtons[6].Text == ListButtons[7].Text && ListButtons[7].Text == ListButtons[8].Text && ListButtons[8].Text == "0")
            {
                MessageBox.Show("Ganó " + ListButtons[8].Text, "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            else if (ListButtons[0].Text == ListButtons[3].Text && ListButtons[3].Text == ListButtons[6].Text && ListButtons[6].Text == "0")
            {
                MessageBox.Show("Ganó " + ListButtons[6].Text, "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            else if (ListButtons[1].Text == ListButtons[4].Text && ListButtons[4].Text == ListButtons[7].Text && ListButtons[7].Text == "0")
            {
                MessageBox.Show("Ganó " + ListButtons[7].Text, "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            // Ganador en la columna 2,5,8 (Gana el 0)
            // Ganó el 0
            else if (ListButtons[2].Text == ListButtons[5].Text && ListButtons[5].Text == ListButtons[8].Text && ListButtons[8].Text == "0")
            {
                MessageBox.Show("Ganó " + ListButtons[8].Text, "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            else if (ListButtons[0].Text == ListButtons[4].Text && ListButtons[4].Text == ListButtons[8].Text && ListButtons[8].Text == "0")
            {
                MessageBox.Show("Ganó " + ListButtons[8].Text, "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            else if (ListButtons[6].Text == ListButtons[4].Text && ListButtons[6].Text == ListButtons[2].Text && ListButtons[2].Text == "0")
            {
                MessageBox.Show("Ganó " + ListButtons[2].Text, "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            else if (ListButtons[0].Text == ListButtons[1].Text && ListButtons[1].Text == ListButtons[2].Text && ListButtons[2].Text == "X")
            {
                MessageBox.Show("Ganó " + ListButtons[2].Text, "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            else if (ListButtons[3].Text == ListButtons[4].Text && ListButtons[4].Text == ListButtons[5].Text && ListButtons[5].Text == "X")
            {
                MessageBox.Show("Ganó " + ListButtons[5].Text, "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            else if (ListButtons[6].Text == ListButtons[7].Text && ListButtons[7].Text == ListButtons[8].Text && ListButtons[8].Text == "X")
            {
                MessageBox.Show("Ganó " + ListButtons[8].Text, "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            else if (ListButtons[0].Text == ListButtons[3].Text && ListButtons[3].Text == ListButtons[6].Text && ListButtons[6].Text == "X")
            {
                MessageBox.Show("Ganó " + ListButtons[6].Text, "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            else if (ListButtons[1].Text == ListButtons[4].Text && ListButtons[4].Text == ListButtons[7].Text && ListButtons[7].Text == "X")
            {
                MessageBox.Show("Ganó " + ListButtons[7].Text, "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            else if (ListButtons[2].Text == ListButtons[5].Text && ListButtons[5].Text == ListButtons[8].Text && ListButtons[8].Text == "X")
            {
                MessageBox.Show("Ganó " + ListButtons[8].Text, "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            else if (ListButtons[0].Text == ListButtons[4].Text && ListButtons[4].Text == ListButtons[8].Text && ListButtons[8].Text == "X")
            {
                MessageBox.Show("Ganó " + ListButtons[8].Text, "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            else if (ListButtons[6].Text == ListButtons[4].Text && ListButtons[6].Text == ListButtons[2].Text && ListButtons[2].Text == "X")
            {
                MessageBox.Show("Ganó " + ListButtons[2].Text, "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            else if (ListButtons[0].Text != "" && ListButtons[1].Text != "" &&
                     ListButtons[2].Text != "" && ListButtons[3].Text != "" && ListButtons[4].Text != "" &&
                     ListButtons[5].Text != "" && ListButtons[6].Text != "" && ListButtons[7].Text != "" &&
                     ListButtons[8].Text != "")
            {
                MessageBox.Show("Empate", "Resultado");
                DisabledControls(grbTicTacToe);
                return 1;
            }
            else
            {
                return 0;
            }
        }
        // ObjectButton = btnTicTacToe5;
        // ObjectButton = ObjectButton;
        // mFlag = "X";

        // ObjectButton.Text = mFlag;
        // btnTicTacToe5.Text = "X"
        // ObjectButton.TabIndex: 4
        // TabIndex:                4 (casillero)
        // mArrayMoves[] = {0,0,0,0,1,0,0,0,0}
        // mMoveNumber = 1;
        // mFlag = "0";

        // ObjectButton = btnTicTacToe1;
        // ObjectButton = ObjectButton;
        // mFlag = "X";

        // ObjectButton.Text = mFlag;
        // btnTicTacToe1.Text = "X"
        // ObjectButton.TabIndex: 0
        // TabIndex:        0 (casillero)
        // mArrayMoves[] = {1,0,3,0,1,0,0,0,0}
        // mMoveNumber = 3;
        // mFlag = "0";

        // ObjectButton = btnTicTacToe7;
        // ObjectButton = ObjectButton;
        // mFlag = "X";

        // ObjectButton.Text = mFlag;
        // btnTicTacToe7.Text = "X"
        // ObjectButton.TabIndex: 6
        // TabIndex:                    6 (casillero)
        // mArrayMoves[] = {1,0,3,0,1,0,1,0,3}
        // mMoveNumber = 5;
        // mFlag = "0";

        private void ShowUserMove(Button ObjectButton)
        {
            ObjectButton.Text = mFlag;
            mArrayMoves[ObjectButton.TabIndex] = 1;
            mMoveNumber++;
            mFlag = "0";
        }

        // indice = 2; 
        // index = indice;
        // ListButtons[2] -> btnTicTacToe3
        // ListButtons[index].Text = mFlag;
        // btnTicTacToe3.Text = "0";
        // mArrayMoves[2] = 3        
        // index: 2
        // index:               2 (casillero)
        // mArrayMoves[] = {0,0,3,0,1,0,0,0,0}
        // mMoveNumber = 2;
        // mFlag = "X";

        // indice = 8; 
        // index = indice;
        // ListButtons[8] -> btnTicTacToe9
        // ListButtons[index].Text = mFlag;
        // btnTicTacToe9.Text = "0";
        // mArrayMoves[8] = 3        
        // index: 8
        // index:                           8 (casillero)
        // mArrayMoves[] = {1,0,3,0,1,0,0,0,3}
        // mMoveNumber = 4;
        // mFlag = "X";

        // indice = 5; 
        // index = indice;
        // ListButtons[5] -> btnTicTacToe6
        // ListButtons[index].Text = mFlag;
        // btnTicTacToe6.Text = "0";
        // mArrayMoves[5] = 3        
        // index: 5
        // index:                     5 (casillero)
        // mArrayMoves[] = {1,0,3,0,1,3,1,0,3}
        // mMoveNumber = 6;
        // mFlag = "X";
        private void ShowNPCMove(List<Button> ListButtons, int index)
        {
            ListButtons[index].Text = mFlag;
            mArrayMoves[index] = 3;
            mMoveNumber++;
            mFlag = "X";
        }

        // index = GenerateRandomNPCMove(ListButtons);        
        // index:                   4 (casillero)
        // mArrayMoves[] = {0,0,0,0,1,0,0,0,0}
        // index:               2 (casillero)
        // mArrayMoves[] = {0,0,0,0,1,0,0,0,0}
        private int GenerateRandomNPCMove(List<Button> ListButtons)
        {
            int index = 0;
            Random RandomNumber = new Random();

            do
            {
                index = RandomNumber.Next(0, 9); //  0->8
                // index = 4; index = 2;
                if (mArrayMoves[index] == 0 && index < mArrayMoves.Length)
                    return index;
            }
            while (true);
        }

        // GlobalClassGame.ControlPlayer = ObjectControlWeakIntelligentMoves.PlayUser(btnTicTacToe5, ListButtons, grbTicTacToe);
        // ObjectButton = btnTicTacToe5;
        // GlobalClassGame.ControlPlayer = ObjectControlWeakIntelligentMoves.PlayUser(btnTicTacToe1, ListButtons, grbTicTacToe);
        // ObjectButton = btnTicTacToe1;
        // GlobalClassGame.ControlPlayer = ObjectControlWeakIntelligentMoves.PlayUser(btnTicTacToe7, ListButtons, grbTicTacToe);
        // ObjectButton = btnTicTacToe7;
        // mGameControl = 0;
        // mGameControl = 1;  Aleguien ganó, perdió o empató
        public bool PlayUser(Button ObjectButton, List<Button> ListButtons,
                             GroupBox grbTicTacToe)
        {
            if (ObjectButton.Text == "")
            {
                if (mFlag == "X")
                {
                    ShowUserMove(ObjectButton);
                    mGameControl = CheckWinner(ListButtons, grbTicTacToe);
                }
                return true;
            }
            else
                return false;
        }

        private int HeuristicNumericalMethod(List<Button> ListButtons)
        {
            int index = 0;
            if (mArrayMoves[0] + mArrayMoves[1] + mArrayMoves[2] == 6)
            {
                if (mArrayMoves[0] == 0) index = 0;
                else if (mArrayMoves[1] == 0) index = 1;
                else if (mArrayMoves[2] == 0) index = 2;
                return index;
            }
            else if (mArrayMoves[3] + mArrayMoves[4] + mArrayMoves[5] == 6)
            {
                if (mArrayMoves[3] == 0) index = 3;
                else if (mArrayMoves[4] == 0) index = 4;
                else if (mArrayMoves[5] == 0) index = 5;
                return index;
            }
            else if (mArrayMoves[6] + mArrayMoves[7] + mArrayMoves[8] == 6)
            {
                if (mArrayMoves[6] == 0) index = 6;
                else if (mArrayMoves[7] == 0) index = 7;
                else if (mArrayMoves[8] == 0) index = 8;
                return index;
            }
            else if (mArrayMoves[0] + mArrayMoves[3] + mArrayMoves[6] == 6)
            {
                if (mArrayMoves[0] == 0) index = 0;
                else if (mArrayMoves[3] == 0) index = 3;
                else if (mArrayMoves[6] == 0) index = 6;
                return index;
            }
            else if (mArrayMoves[1] + mArrayMoves[4] + mArrayMoves[7] == 6)
            {
                if (mArrayMoves[1] == 0) index = 1;
                else if (mArrayMoves[4] == 0) index = 4;
                else if (mArrayMoves[7] == 0) index = 7;
                return index;
            }
            // Sumatoria en la columna 2,5,8 igual a 6 (Gana el 0)
            // Columna: 2,5,8
            // Posición:        0,1,2,3,4,5,6,7,8
            // mArrayMoves[] = {1,0,3,0,1,0,1,0,3}
            // 3 + 0 + 3 = 6
            // (mArrayMoves[5] == 0) index = 5;
            else if (mArrayMoves[2] + mArrayMoves[5] + mArrayMoves[8] == 6)
            {
                if (mArrayMoves[2] == 0) index = 2;
                else if (mArrayMoves[5] == 0) index = 5;
                else if (mArrayMoves[8] == 0) index = 8;
                return index;
            }
            else if (mArrayMoves[0] + mArrayMoves[4] + mArrayMoves[8] == 6)
            {
                if (mArrayMoves[0] == 0) index = 0;
                else if (mArrayMoves[4] == 0) index = 4;
                else if (mArrayMoves[8] == 0) index = 8;
                return index;
            }
            else if (mArrayMoves[2] + mArrayMoves[4] + mArrayMoves[6] == 6)
            {
                if (mArrayMoves[2] == 0) index = 2;
                else if (mArrayMoves[4] == 0) index = 4;
                else if (mArrayMoves[6] == 0) index = 6;
                return index;
            }
            else if (mArrayMoves[0] + mArrayMoves[1] + mArrayMoves[2] == 2)
            {
                if (mArrayMoves[0] == 0) index = 0;
                else if (mArrayMoves[1] == 0) index = 1;
                else if (mArrayMoves[2] == 0) index = 2;
                return index;
            }
            else if (mArrayMoves[3] + mArrayMoves[4] + mArrayMoves[5] == 2)
            {
                if (mArrayMoves[3] == 0) index = 3;
                else if (mArrayMoves[4] == 0) index = 4;
                else if (mArrayMoves[5] == 0) index = 5;
                return index;
            }
            else if (mArrayMoves[6] + mArrayMoves[7] + mArrayMoves[8] == 2)
            {
                if (mArrayMoves[6] == 0) index = 6;
                else if (mArrayMoves[7] == 0) index = 7;
                else if (mArrayMoves[8] == 0) index = 8;
                return index;
            }
            else if (mArrayMoves[0] + mArrayMoves[3] + mArrayMoves[6] == 2)
            {
                if (mArrayMoves[0] == 0) index = 0;
                else if (mArrayMoves[3] == 0) index = 3;
                else if (mArrayMoves[6] == 0) index = 6;
                return index;
            }
            else if (mArrayMoves[1] + mArrayMoves[4] + mArrayMoves[7] == 2)
            {
                if (mArrayMoves[1] == 0) index = 1;
                else if (mArrayMoves[4] == 0) index = 4;
                else if (mArrayMoves[7] == 0) index = 7;
                return index;
            }
            else if (mArrayMoves[2] + mArrayMoves[5] + mArrayMoves[8] == 2)
            {
                if (mArrayMoves[2] == 0) index = 2;
                else if (mArrayMoves[5] == 0) index = 5;
                else if (mArrayMoves[8] == 0) index = 8;
                return index;
            }
            // Sumatoria en la diagonal 0,4,8 igual a 2 (Bloqueo)
            // Diagonal: 0,4,8
            // Posición:        0,1,2,3,4,5,6,7,8
            // mArrayMoves[] = {1,0,3,0,1,0,0,0,0}
            // 1 + 1 + 0 = 2
            // if (mArrayMoves[8] == 0) index = 8;
            else if (mArrayMoves[0] + mArrayMoves[4] + mArrayMoves[8] == 2)
            {
                if (mArrayMoves[0] == 0) index = 0;
                else if (mArrayMoves[4] == 0) index = 4;
                else if (mArrayMoves[8] == 0) index = 8;
                return index;
            }
            else if (mArrayMoves[2] + mArrayMoves[4] + mArrayMoves[6] == 2)
            {
                if (mArrayMoves[2] == 0) index = 2;
                else if (mArrayMoves[4] == 0) index = 4;
                else if (mArrayMoves[6] == 0) index = 6;
                return index;
            }
            else
            {
                // index = 2;
                index = GenerateRandomNPCMove(ListButtons);
                return index;
            }
            // Técnica Heurística de IA Semi-Fuerte
            // 16 casos heurísticos. 
            // los demás son aleatorios.
            // 9! = 362.880 casos (combinaciones)
        }
        // ObjectControlWeakIntelligentMoves.PlayNPC(ListButtons, grbTicTacToe);
        // mGameControl = 0;   
        // mGameControl = 1;  
        public void PlayNPC(List<Button> ListButtons, GroupBox grbTicTacToe)
        {
            int indice;
            Random RandomNumber = new Random();

            if (mGameControl == 0)
            {
                if (mArrayMoves[4] == 0)
                {
                    indice = 4;
                    ShowNPCMove(ListButtons, indice);
                    mGameControl = CheckWinner(ListButtons, grbTicTacToe);
                    return;
                }
                else
                {
                    indice = HeuristicNumericalMethod(ListButtons);
                    // indice = 2; // Aleatorio
                    // indice = 8; // Bloqueo
                    // indice = 5; // Gana el 0
                    ShowNPCMove(ListButtons, indice);
                    mGameControl = CheckWinner(ListButtons, grbTicTacToe);
                    return;
                }
            }
            else
                return;

        }

        #endregion


    }
}
