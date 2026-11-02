using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.Windows.Forms;

namespace TicTacToeGameLibrary
{
    public class GlobalClassGame
    {
        // Clase Global: Todos sus miembros son de tipo static
        // Datos miembro son de tipo private y de tipo static
        // Funciones miembro son de tipo public y de tipo static
        // Funciones miembro - Properties (get-set).
        // Los miembros static van a a estar cargados en memoria todo
        // el tiempo que dura la ejecución del programa y se los puede
        // utilizar en cualquier parte del programa, en cualquier formulario
        // y en cualquier clase.
        // No se puede instanciar objetos de tipo GlobalClassGame que tiene
        // todos sus miembros de tipo static
        // El acceso a las propiedades se lo hace utilizando la misma clase.        
        #region Atributes of the class
        ///<summary>
        /// Member data (variables)
        ///</summary>

        private static int mGameLevel;
        private static int mGains;
        private static int mLosses;
        private static int mDraws;
        private static int mLanguage;
        private static bool mControlPlayer;

        #endregion

        #region Properties
        ///<summary>
        /// Manage access descriptors (get & set)
        ///</summary> 

        //GlobalClassGame Obj = new GlobalClassGame();// Error (Mal)
        //GlobalClassGame.GameLevel = 1;//set
        //valor = GlobalClassGame.GameLevel;//get
        // GlobalClassGame.GameLevel = 0;
        // GlobalClassGame.GameLevel == 0
        // GlobalClassGame.GameLevel = 1;
        // GlobalClassGame.GameLevel == 1
        // GlobalClassGame.GameLevel = 2;
        // GlobalClassGame.GameLevel == 2
        public static int GameLevel
        {
            get { return GlobalClassGame.mGameLevel; }
            set { GlobalClassGame.mGameLevel = value; }
        }

        public static int Gains
        {
            get { return GlobalClassGame.mGains; }
            set { GlobalClassGame.mGains = value; }
        }

        public static int Losses
        {
            get { return GlobalClassGame.mLosses; }
            set { GlobalClassGame.mLosses = value; }
        }

        public static int Draws
        {
            get { return GlobalClassGame.mDraws; }
            set { GlobalClassGame.mDraws = value; }
        }

        public static int Language
        {
            get { return GlobalClassGame.mLanguage; }
            set { GlobalClassGame.mLanguage = value; }
        }

        public static bool ControlPlayer
        {
            get { return GlobalClassGame.mControlPlayer; }
            set { GlobalClassGame.mControlPlayer = value; }
        }

        #endregion


    }
}
