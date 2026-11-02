/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Game;

import java.util.Collection;
import java.util.Iterator;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

/**
 *
 * @author cxvil
 */
public class ControlWeakIntelligentMoves {

    private String mFlag;
    private int mMoveNumber;
    private int mGameControl;
    private int[] mArrayMoves = new int[9];
    private RandomGroup mRandomNumber;

    /**
     * @return the mBandera
     */
    public String getFlag() {
        return mFlag;
    }

    /**
     * @param mBandera the mBandera to set
     */
    public void setFlag(String flag) {
        this.mFlag = flag;
    }

    /**
     * @return the mNumeroJugada
     */
    public int getMoveNumber() {
        return mMoveNumber;
    }

    /**
     * @param mNumeroJugada the mNumeroJugada to set
     */
    public void setMoveNumber(int moveNumber) {
        this.mMoveNumber = moveNumber;
    }

    /**
     * @return the mControlJuego
     */
    public int getGameControl() {
        return mGameControl;
    }

    /**
     * @param mControlJuego the mControlJuego to set
     */
    public void setGameControl(int gameControl) {
        this.mGameControl = gameControl;
    }

    /**
     * @return the mArregloJugadas
     */
    public int[] getArrayMoves() {
        return mArrayMoves;
    }

    /**
     * @param mArregloJugadas the mArregloJugadas to set
     */
    public void setArrayMoves(int[] arrayMoves) {
        this.mArrayMoves = arrayMoves;
    }

    /**
     * @return the mNumeroAleatorio
     */
    public RandomGroup getRandomGroup() {
        return mRandomNumber;
    }

    /**
     * @param mNumeroAleatorio the mNumeroAleatorio to set
     */
    public void setRandomGroup(RandomGroup randomNumber) {
        this.mRandomNumber = randomNumber;
    }

    //Constructor sin parámetros.
    public ControlWeakIntelligentMoves() {
        for (int i = 0; i < mArrayMoves.length; i++) {
            mArrayMoves[i] = 0;
        }

        mFlag = "X";
        mMoveNumber = 0;
        mGameControl = 0;
        mRandomNumber = new RandomGroup();
    }

    public void InitializeData() {
        for (int i = 0; i < mArrayMoves.length; i++) {
            mArrayMoves[i] = 0;
        }

        mFlag = "X";
        mMoveNumber = 0;
        mGameControl = 0;
        mRandomNumber = new RandomGroup();
    }

    public void InitializeControls(Collection<JButton> ListButtons,
            JPanel panTicTacToe) {

        for (JButton ObjButton : ListButtons) {
            ObjButton.setText("");
        }

        panTicTacToe.setEnabled(true);
        EnableButtons(ListButtons, true);
    }

    public void DisabledControls(JPanel panTicTacToe) {
        panTicTacToe.setEnabled(false);
    }

    public void EnabledControls(JPanel panTicTacToe) {
        panTicTacToe.setEnabled(true);
    }

    private void EnableButtons(Collection<JButton> ListButtons, boolean flag) {
        Iterator<JButton> it = ListButtons.iterator();

        while (it.hasNext()) {
            JButton ObjButton = it.next();
            ObjButton.setEnabled(flag);
        }
    }

    private JButton GetItemListButtons(Collection<JButton> ListButtons, int index) {
        Iterator<JButton> it = ListButtons.iterator();
        int i = 0;

        while (it.hasNext()) {
            JButton ObjButton = it.next();
            if (index == i) {
                return ObjButton;
            } else {
                i++;
            }
        }
        return null;
    }

    public int CheckWinner(Collection<JButton> ListButtons, JPanel panTicTacToe) {
        // Verificar ganador 0
        if (GetItemListButtons(ListButtons, 0).getText().
                equals(GetItemListButtons(ListButtons, 1).getText())
                && GetItemListButtons(ListButtons, 1).getText().
                        equals(GetItemListButtons(ListButtons, 2).getText())
                && GetItemListButtons(ListButtons, 2).getText().
                        equals("X")) {
            JOptionPane.showMessageDialog(null, "GanÃ³ X");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } else if (GetItemListButtons(ListButtons, 3).getText().
                equals(GetItemListButtons(ListButtons, 4).getText())
                && GetItemListButtons(ListButtons, 4).getText().
                        equals(GetItemListButtons(ListButtons, 5).getText())
                && GetItemListButtons(ListButtons, 5).getText().
                        equals("X")) {
            JOptionPane.showMessageDialog(null, "GanÃ³ X");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } else if (GetItemListButtons(ListButtons, 6).getText().
                equals(GetItemListButtons(ListButtons, 7).getText())
                && GetItemListButtons(ListButtons, 7).getText().
                        equals(GetItemListButtons(ListButtons, 8).getText())
                && GetItemListButtons(ListButtons, 8).getText().
                        equals("X")) {
            JOptionPane.showMessageDialog(null, "GanÃ³ X");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } else if (GetItemListButtons(ListButtons, 0).getText().
                equals(GetItemListButtons(ListButtons, 3).getText())
                && GetItemListButtons(ListButtons, 3).getText().
                        equals(GetItemListButtons(ListButtons, 6).getText())
                && GetItemListButtons(ListButtons, 6).getText().
                        equals("X")) {
            JOptionPane.showMessageDialog(null, "GanÃ³ X");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } else if (GetItemListButtons(ListButtons, 1).getText().
                equals(GetItemListButtons(ListButtons, 4).getText())
                && GetItemListButtons(ListButtons, 4).getText().
                        equals(GetItemListButtons(ListButtons, 7).getText())
                && GetItemListButtons(ListButtons, 7).getText().
                        equals("X")) {
            JOptionPane.showMessageDialog(null, "GanÃ³ X");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } else if (GetItemListButtons(ListButtons, 2).getText().
                equals(GetItemListButtons(ListButtons, 5).getText())
                && GetItemListButtons(ListButtons, 5).getText().
                        equals(GetItemListButtons(ListButtons, 8).getText())
                && GetItemListButtons(ListButtons, 8).getText().
                        equals("X")) {
            JOptionPane.showMessageDialog(null, "GanÃ³ X");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } else if (GetItemListButtons(ListButtons, 0).getText().
                equals(GetItemListButtons(ListButtons, 4).getText())
                && GetItemListButtons(ListButtons, 4).getText().
                        equals(GetItemListButtons(ListButtons, 8).getText())
                && GetItemListButtons(ListButtons, 8).getText().
                        equals("X")) {
            JOptionPane.showMessageDialog(null, "GanÃ³ X");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } else if (GetItemListButtons(ListButtons, 2).getText().
                equals(GetItemListButtons(ListButtons, 4).getText())
                && GetItemListButtons(ListButtons, 4).getText().
                        equals(GetItemListButtons(ListButtons, 6).getText())
                && GetItemListButtons(ListButtons, 6).getText().
                        equals("X")) {
            JOptionPane.showMessageDialog(null, "GanÃ³ X");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } // Verificar ganador 0
        else if (GetItemListButtons(ListButtons, 0).getText().
                equals(GetItemListButtons(ListButtons, 1).getText())
                && GetItemListButtons(ListButtons, 1).getText().
                        equals(GetItemListButtons(ListButtons, 2).getText())
                && GetItemListButtons(ListButtons, 2).getText().
                        equals("0")) {
            JOptionPane.showMessageDialog(null, "GanÃ³ 0");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } else if (GetItemListButtons(ListButtons, 3).getText().
                equals(GetItemListButtons(ListButtons, 4).getText())
                && GetItemListButtons(ListButtons, 4).getText().
                        equals(GetItemListButtons(ListButtons, 5).getText())
                && GetItemListButtons(ListButtons, 5).getText().
                        equals("0")) {
            JOptionPane.showMessageDialog(null, "GanÃ³ 0");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } else if (GetItemListButtons(ListButtons, 6).getText().
                equals(GetItemListButtons(ListButtons, 7).getText())
                && GetItemListButtons(ListButtons, 7).getText().
                        equals(GetItemListButtons(ListButtons, 8).getText())
                && GetItemListButtons(ListButtons, 8).getText().
                        equals("0")) {
            JOptionPane.showMessageDialog(null, "GanÃ³ 0");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } else if (GetItemListButtons(ListButtons, 0).getText().
                equals(GetItemListButtons(ListButtons, 3).getText())
                && GetItemListButtons(ListButtons, 3).getText().
                        equals(GetItemListButtons(ListButtons, 6).getText())
                && GetItemListButtons(ListButtons, 6).getText().
                        equals("0")) {
            JOptionPane.showMessageDialog(null, "GanÃ³ 0");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } else if (GetItemListButtons(ListButtons, 1).getText().
                equals(GetItemListButtons(ListButtons, 4).getText())
                && GetItemListButtons(ListButtons, 4).getText().
                        equals(GetItemListButtons(ListButtons, 7).getText())
                && GetItemListButtons(ListButtons, 7).getText().
                        equals("0")) {
            JOptionPane.showMessageDialog(null, "GanÃ³ 0");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } else if (GetItemListButtons(ListButtons, 2).getText().
                equals(GetItemListButtons(ListButtons, 5).getText())
                && GetItemListButtons(ListButtons, 5).getText().
                        equals(GetItemListButtons(ListButtons, 8).getText())
                && GetItemListButtons(ListButtons, 8).getText().
                        equals("0")) {
            JOptionPane.showMessageDialog(null, "GanÃ³ 0");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } else if (GetItemListButtons(ListButtons, 0).getText().
                equals(GetItemListButtons(ListButtons, 4).getText())
                && GetItemListButtons(ListButtons, 4).getText().
                        equals(GetItemListButtons(ListButtons, 8).getText())
                && GetItemListButtons(ListButtons, 8).getText().
                        equals("0")) {
            JOptionPane.showMessageDialog(null, "GanÃ³ 0");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } else if (GetItemListButtons(ListButtons, 2).getText().
                equals(GetItemListButtons(ListButtons, 4).getText())
                && GetItemListButtons(ListButtons, 4).getText().
                        equals(GetItemListButtons(ListButtons, 6).getText())
                && GetItemListButtons(ListButtons, 6).getText().
                        equals("0")) {
            JOptionPane.showMessageDialog(null, "GanÃ³ 0");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } // Empate
        else if (!GetItemListButtons(ListButtons, 0).getText().equals("")
                && !GetItemListButtons(ListButtons, 1).getText().equals("")
                && !GetItemListButtons(ListButtons, 2).getText().equals("")
                && !GetItemListButtons(ListButtons, 3).getText().equals("")
                && !GetItemListButtons(ListButtons, 4).getText().equals("")
                && !GetItemListButtons(ListButtons, 5).getText().equals("")
                && !GetItemListButtons(ListButtons, 6).getText().equals("")
                && !GetItemListButtons(ListButtons, 7).getText().equals("")
                && !GetItemListButtons(ListButtons, 8).getText().equals("")) {
            JOptionPane.showMessageDialog(null, "Empate");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
            return 1;
        } else {
            return 0;
        }
    }

    private void ShowUserMove(JButton ObjButton, int index) {
        ObjButton.setText(mFlag);
        mArrayMoves[index] = 1;
        mMoveNumber++;
        mFlag = "0";
    }

    private void ShowNPCMove(Collection<JButton> ListButtons, int index) {
        GetItemListButtons(ListButtons, index).setText(mFlag);
        //ListaBotones[indice].Text = mBandera;
        mArrayMoves[index] = 3;
        mMoveNumber++;
        mFlag = "X";
    }

    private int GenerateRandomNPCMove(Collection<JButton> ListButtons) {
        int index;
        do {
            index = getRandomGroup().getRandomNumber(0, 8);
            if (mArrayMoves[index] == 0 && index < mArrayMoves.length) {
                return index;
            }
        } while (true);
    }

    public void PlayUser(JButton ObjButton, Collection<JButton> ListButtons,
            JPanel panTicTacToe, int index) {
        if (ObjButton.getText().equals("")) {
            if (mFlag == "X") {
                ShowUserMove(ObjButton, index);
                mGameControl = CheckWinner(ListButtons, panTicTacToe);
                GetItemListButtons(ListButtons, index).setEnabled(false);
            }
        }
        else{
            return;
        }
    }

    private int HeuristicNumericalMethod(Collection<JButton> ListButtons) {
        int index = 0;
        if (mArrayMoves[0] + mArrayMoves[1] + mArrayMoves[2] == 6) {
            if (mArrayMoves[0] == 0) {
                index = 0;
            } else if (mArrayMoves[1] == 0) {
                index = 1;
            } else if (mArrayMoves[2] == 0) {
                index = 2;
            }
            return index;
        } else if (mArrayMoves[3] + mArrayMoves[4] + mArrayMoves[5] == 6) {
            if (mArrayMoves[3] == 0) {
                index = 3;
            } else if (mArrayMoves[4] == 0) {
                index = 4;
            } else if (mArrayMoves[5] == 0) {
                index = 5;
            }
            return index;
        } else if (mArrayMoves[6] + mArrayMoves[7] + mArrayMoves[8] == 6) {
            if (mArrayMoves[6] == 0) {
                index = 6;
            } else if (mArrayMoves[7] == 0) {
                index = 7;
            } else if (mArrayMoves[8] == 0) {
                index = 8;
            }
            return index;
        } else if (mArrayMoves[0] + mArrayMoves[3] + mArrayMoves[6] == 6) {
            if (mArrayMoves[0] == 0) {
                index = 0;
            } else if (mArrayMoves[3] == 0) {
                index = 3;
            } else if (mArrayMoves[6] == 0) {
                index = 6;
            }
            return index;
        } else if (mArrayMoves[1] + mArrayMoves[4] + mArrayMoves[7] == 6) {
            if (mArrayMoves[1] == 0) {
                index = 1;
            } else if (mArrayMoves[4] == 0) {
                index = 4;
            } else if (mArrayMoves[7] == 0) {
                index = 7;
            }
            return index;
        } // Sumatoria en la columna 2,5,8 igual a 6 (Gana el 0)
        // Columna: 2,5,8
        // Posición:        0,1,2,3,4,5,6,7,8
        // mArrayMoves[] = {1,0,3,0,1,0,1,0,3}
        // 3 + 0 + 3 = 6
        // (mArrayMoves[5] == 0) index = 5;
        else if (mArrayMoves[2] + mArrayMoves[5] + mArrayMoves[8] == 6) {
            if (mArrayMoves[2] == 0) {
                index = 2;
            } else if (mArrayMoves[5] == 0) {
                index = 5;
            } else if (mArrayMoves[8] == 0) {
                index = 8;
            }
            return index;
        } else if (mArrayMoves[0] + mArrayMoves[4] + mArrayMoves[8] == 6) {
            if (mArrayMoves[0] == 0) {
                index = 0;
            } else if (mArrayMoves[4] == 0) {
                index = 4;
            } else if (mArrayMoves[8] == 0) {
                index = 8;
            }
            return index;
        } else if (mArrayMoves[2] + mArrayMoves[4] + mArrayMoves[6] == 6) {
            if (mArrayMoves[2] == 0) {
                index = 2;
            } else if (mArrayMoves[4] == 0) {
                index = 4;
            } else if (mArrayMoves[6] == 0) {
                index = 6;
            }
            return index;
        } else if (mArrayMoves[0] + mArrayMoves[1] + mArrayMoves[2] == 2) {
            if (mArrayMoves[0] == 0) {
                index = 0;
            } else if (mArrayMoves[1] == 0) {
                index = 1;
            } else if (mArrayMoves[2] == 0) {
                index = 2;
            }
            return index;
        } else if (mArrayMoves[3] + mArrayMoves[4] + mArrayMoves[5] == 2) {
            if (mArrayMoves[3] == 0) {
                index = 3;
            } else if (mArrayMoves[4] == 0) {
                index = 4;
            } else if (mArrayMoves[5] == 0) {
                index = 5;
            }
            return index;
        } else if (mArrayMoves[6] + mArrayMoves[7] + mArrayMoves[8] == 2) {
            if (mArrayMoves[6] == 0) {
                index = 6;
            } else if (mArrayMoves[7] == 0) {
                index = 7;
            } else if (mArrayMoves[8] == 0) {
                index = 8;
            }
            return index;
        } else if (mArrayMoves[0] + mArrayMoves[3] + mArrayMoves[6] == 2) {
            if (mArrayMoves[0] == 0) {
                index = 0;
            } else if (mArrayMoves[3] == 0) {
                index = 3;
            } else if (mArrayMoves[6] == 0) {
                index = 6;
            }
            return index;
        } else if (mArrayMoves[1] + mArrayMoves[4] + mArrayMoves[7] == 2) {
            if (mArrayMoves[1] == 0) {
                index = 1;
            } else if (mArrayMoves[4] == 0) {
                index = 4;
            } else if (mArrayMoves[7] == 0) {
                index = 7;
            }
            return index;
        } else if (mArrayMoves[2] + mArrayMoves[5] + mArrayMoves[8] == 2) {
            if (mArrayMoves[2] == 0) {
                index = 2;
            } else if (mArrayMoves[5] == 0) {
                index = 5;
            } else if (mArrayMoves[8] == 0) {
                index = 8;
            }
            return index;
        } // Sumatoria en la diagonal 0,4,8 igual a 2 (Bloqueo)
        // Diagonal: 0,4,8
        // Posición:        0,1,2,3,4,5,6,7,8
        // mArrayMoves[] = {1,0,3,0,1,0,0,0,0}
        // 1 + 1 + 0 = 2
        // if (mArrayMoves[8] == 0) index = 8;
        else if (mArrayMoves[0] + mArrayMoves[4] + mArrayMoves[8] == 2) {
            if (mArrayMoves[0] == 0) {
                index = 0;
            } else if (mArrayMoves[4] == 0) {
                index = 4;
            } else if (mArrayMoves[8] == 0) {
                index = 8;
            }
            return index;
        } else if (mArrayMoves[2] + mArrayMoves[4] + mArrayMoves[6] == 2) {
            if (mArrayMoves[2] == 0) {
                index = 2;
            } else if (mArrayMoves[4] == 0) {
                index = 4;
            } else if (mArrayMoves[6] == 0) {
                index = 6;
            }
            return index;
        } else {
            // index = 2;
            index = GenerateRandomNPCMove(ListButtons);
            return index;
        }
        // Técnica Heurística de IA Semi-Fuerte
        // 16 casos heurísticos. 
        // los demás son aleatorios.
        // 9! = 362.880 casos (combinaciones)
    }

    public void PlayNPC(Collection<JButton> ListButtons,
            JPanel panTicTacToe) {
        int index;
        if (mGameControl == 0) {
            if (mArrayMoves[4] == 0) {
                index = 4;
                ShowNPCMove(ListButtons, index);
                mGameControl = CheckWinner(ListButtons, panTicTacToe);
                return;
            } else {
                index = HeuristicNumericalMethod(ListButtons);
                // indice = 2; // Aleatorio
                // indice = 8; // Bloqueo
                // indice = 5; // Gana el 0
                ShowNPCMove(ListButtons, index);
                mGameControl = CheckWinner(ListButtons, panTicTacToe);
                return;
            }
        } else {
            return;
        }
    }

}
