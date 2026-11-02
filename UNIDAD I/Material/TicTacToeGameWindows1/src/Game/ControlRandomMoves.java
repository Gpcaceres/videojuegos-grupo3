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
public class ControlRandomMoves {

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
    public ControlRandomMoves() {
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

    public void PlayNPC(Collection<JButton> ListButtons,
            JPanel panTicTacToe) {
        if (mGameControl == 0) {
            int index;
            index = GenerateRandomNPCMove(ListButtons);            
            ShowNPCMove(ListButtons, index);
            mGameControl = CheckWinner(ListButtons, panTicTacToe);
        } else {
            return;
        }
    }

}
