import { useEffect, useState } from 'react';
import '../../index.css';
import 'styles/checkbox.css';
import { useFirestore } from '~/lib/firebase';
import { query, where, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useAuthState } from '../contexts/UserContext';
import { User } from 'firebase/auth';

type Range = { label: string, clicked_orage: boolean, clicked_bleu: boolean, clicked_rouge: boolean }[];

function grilleRange() {
  const [bleuBoxChecked, setBleuBoxChecked] = useState(false);
  const [redBoxChecked, setRedBoxChecked] = useState(false);
  const [pressedButtons, setPressedButtons] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(false)
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  const [selectedRangeId, setSelectedRangeId] = useState('');
  const [allRanges, setAllRanges] = useState<any>([]);
  const { state } = useAuthState();
  const GridRangeCollection = collection(useFirestore(), "RangeGrid");

  const handleBleuBoxChange = (event: any) => {
    setBleuBoxChecked(event.target.checked);
    if (event.target.checked) {
      setRedBoxChecked(false); // Désactive le toggle-rouge si le toggle-bleu est activé
    }
  };
  const handleRedBoxChange = (event: any) => {
    setRedBoxChecked(event.target.checked);
    if (event.target.checked) {
      setBleuBoxChecked(false); // Désactive le toggle-rouge si le toggle-bleu est activé
    }
  };
  const makeMatrix = (): Range => {
    let letters = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2', '1'];

    let range_matrix = Array.from({ length: 13 }, () => Array(13).fill([]));

    for (let i = 0; i < 13; i++) {
      for (let j = i; j < 13; j++) {
        const label = `${letters[i]}${letters[j]}${i !== j ? 's' : ''}`
        range_matrix[i][j] = { label, clicked_orage: false, clicked_bleu: false, clicked_rouge: false };
      }
      for (let j = i; j < 13; j++) {
        const label = `${letters[i]}${letters[j]}${i !== j ? 'o' : ''}`
        range_matrix[j][i] = { label, clicked_orage: false, clicked_bleu: false, clicked_rouge: false };
      }
    }
    return range_matrix.flat()
  }

  const [range, setRange] = useState<Range>(makeMatrix());
  const toggle = (label: string): void => {
    setRange(range.map((cell) => {
      if (cell.label === label) {
        if (bleuBoxChecked) {
          return { label: cell.label, clicked_orage: cell.clicked_orage, clicked_bleu: !cell.clicked_bleu, clicked_rouge: cell.clicked_rouge }
        } else if (redBoxChecked) {
          return { label: cell.label, clicked_orage: cell.clicked_orage, clicked_bleu: cell.clicked_bleu, clicked_rouge: !cell.clicked_rouge }
        } else {
          return { label: cell.label, clicked_orage: !cell.clicked_orage, clicked_bleu: cell.clicked_bleu, clicked_rouge: cell.clicked_rouge }
        }
      }
      return cell
    }))
  }
  const handleMouseEnter = (label: string): void => {
    if (pressedButtons.length > 0) {
      toggle(label);
    }
  };
  const handleMouseDown = (label: string): void => {

    setPressedButtons((prevButtons) => [...prevButtons, label]);
    toggle(label);
  };

  const handleMouseUp = (): void => {
    setPressedButtons([]);
  };

  const DeleteGrid = async (id: any) => {
    const gridDoc = doc(useFirestore(), "RangeGrid", id)
    await deleteDoc(gridDoc)
    setRefresh(!refresh)
  }

  const CreateGrid = async () => {
    if (state.state === 'SIGNED_IN') {
      const newRange = makeMatrix()
      await addDoc(GridRangeCollection, { Categorie: 'New ', name: 'range', cells: newRange.flat(), userId: state.currentUser.uid });
      setRefresh(!refresh)
    }
  }

  const UpdateGrid = async (id: any) => {
    if (state.state === 'SIGNED_IN') {
      if (id == '') {
        await addDoc(GridRangeCollection, { Categorie: inputValue1, name: inputValue2, cells: range.flat(), userId: state.currentUser.uid });
      } else {
        const gridDoc = doc(useFirestore(), "RangeGrid", id)
        const newFields = { Categorie: inputValue1, name: inputValue2, cells: range.flat(), userId: state.currentUser.uid };
        await updateDoc(gridDoc, newFields)

      }
      setRefresh(!refresh)
    }
  }

  const getColor = (cell: any) => {
    let color = "";
    if (cell.clicked_orage && cell.clicked_bleu) {
      color = "bg-gradient-to-r from-orange-400 to-blue-600 text-black";
    } else if (cell.clicked_orage) {
      color = "bg-orange-400 text-black"
    } else if (cell.clicked_bleu) {
      color = "bg-blue-400 text-black";
    } else if (cell.clicked_rouge) {
      color = "bg-red-400 text-black";
    } else { color = "bg-slate-600" }
    return color;
  }

  const printGrid = async (id: any) => {
    const selectRange = allRanges.find((doc: any) => doc.id === id);
    setRange(selectRange.cells);
    setInputValue1(selectRange.Categorie)
    setInputValue2(selectRange.name)
  }

  useEffect(() => {

    const getGridRange = async () => {
      if (state.state === 'SIGNED_IN') {
        const userUID = state.currentUser.uid;
        const data = await getDocs(query(GridRangeCollection, where("userId", "==", userUID)));
        setAllRanges(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    }
    getGridRange();
  }, [state, refresh]);

  return (
    <main className="flex flex-col h-full items-center justify-center">
      {
        state.state === 'SIGNED_IN' ? (
          <div className="flex flex-col h-full items-center justify-center">
            <div className="flex flex-row mr-auto gap-12">
              <select className='mb-8  p-2 rounded w-1/2' onChange={(e) => { printGrid(e.target.value); setSelectedRangeId(e.target.value) }}>
                <option value=""> Choix </option>
                {allRanges.map((rangeDoc: any) => (
                  <option key={rangeDoc.id} value={rangeDoc.id}> {rangeDoc.Categorie + rangeDoc.name} </option>
                ))}</select>
              <button className='mb-8 bg-slate-400 rounded px-2 text-black hover:bg-orange-400' onClick={CreateGrid}> New range </button>
            </div>
            <div className="grid grid-cols-13 gap-1 p-1">
              {range.map((cell, index) => (
                <div
                  key={cell.label + index}
                  className={`w-auto aspect-square rounded cursor-pointer unselectable flex justify-center items-center ${getColor(cell)}`}
                  onMouseEnter={() => handleMouseEnter(cell.label)}
                  onMouseDown={() => handleMouseDown(cell.label)}
                  onMouseUp={handleMouseUp}>
                  <p className="text-sm -md:text-xs" >  {cell.label} </p>
                </div>
              ))}
            </div>

            <div className="checkbox-wrapper-34 flex-row flex gap-28 p-3">
              <input className='tgl tgl-ios' id='toggle-34' type='checkbox' checked={bleuBoxChecked} onChange={handleBleuBoxChange} />
              <label className='tgl-btn' htmlFor='toggle-34'></label>
              <input className='tgl tgl-ios' id='toggle-rouge' type='checkbox' checked={redBoxChecked} onChange={handleRedBoxChange} />
              <label className='tgl-btn' htmlFor='toggle-rouge'></label>
            </div>

            <div className='flex gap-2'>
              <input className='w-full rounded p-2 border bg-transparent text-slate-100 placeholder-slate-200'
                type='text'
                placeholder='Categorie'
                value={inputValue1}
                onChange={(e) => setInputValue1(e.target.value)}
              />
              <input className='w-full rounded p-2 border bg-transparent text-slate-100 placeholder-slate-200'
                type='text'
                placeholder='Nom'
                value={inputValue2}
                onChange={(e) => setInputValue2(e.target.value)}
              />
            </div>
            <div className='flex gap-12'>
              <button className="mt-5 bg-slate-400 rounded px-2 text-black hover:bg-orange-400"
                onClick={() => UpdateGrid(selectedRangeId)}> SAVE </button>
              <button className="mt-5 bg-slate-400 rounded px-2 text-black hover:bg-orange-400"
                onClick={() => DeleteGrid(selectedRangeId)}> DELETE  </button>
            </div>
          </div>
        ) : (
          <div>pas conncecté </div>
        )
      }
    </main >
  )
}
export default grilleRange;



