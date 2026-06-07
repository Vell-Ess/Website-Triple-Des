// ============================================================================
// TUGAS VELANO ESBI: IMPLEMENTASI MATEMATIKA & STRUKTUR ALGORITMA TRIPLE DES
// ============================================================================

const IP = [58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7];

// [SUDAH DIPERBAIKI]: Typo angka 36 menjadi 52 pada baris FP
const FP = [40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25];

const PC1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
const PC2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
const SHIFTS = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
const E = [32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32, 1];
const P = [16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25];

const S_BOXES = [
    [14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7, 0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8, 4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0, 15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13],
    [15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10, 3,13,4,7,15,2,8,14,12,0,1,10,6,9,11,5, 0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15, 13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9],
    [10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8, 13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1, 13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7, 1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12],
    [7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15, 13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9, 10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4, 3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14],
    [2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9, 14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6, 4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14, 11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3],
    [12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11, 10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8, 9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6, 4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13],
    [4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1, 13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6, 1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2, 6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12],
    [13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7, 1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2, 7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8, 2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11]
];

function bytesToBits(bytes) {
    let bits = new Uint8Array(bytes.length * 8);
    for (let i = 0; i < bytes.length; i++) {
        for (let j = 0; j < 8; j++) {
            bits[i * 8 + j] = (bytes[i] >> (7 - j)) & 1;
        }
    }
    return bits;
}

function bitsToBytes(bits) {
    let bytes = new Uint8Array(Math.ceil(bits.length / 8));
    for (let i = 0; i < bits.length; i++) {
        if (bits[i]) bytes[Math.floor(i / 8)] |= (1 << (7 - (i % 8)));
    }
    return bytes;
}

function permute(inputBits, table) {
    let outputBits = new Uint8Array(table.length);
    for (let i = 0; i < table.length; i++) {
        outputBits[i] = inputBits[table[i] - 1];
    }
    return outputBits;
}

function shiftLeft(bits, count) {
    let out = new Uint8Array(bits.length);
    for (let i = 0; i < bits.length; i++) {
        out[i] = bits[(i + count) % bits.length];
    }
    return out;
}

function generateSubkeys(keyBytes) {
    let keyBits = bytesToBits(keyBytes);
    let permutedKey = permute(keyBits, PC1);
    let left = permutedKey.slice(0, 28);
    let right = permutedKey.slice(28, 56);
    let subkeys = [];

    for (let round = 0; round < 16; round++) {
        left = shiftLeft(left, SHIFTS[round]);
        right = shiftLeft(right, SHIFTS[round]);
        let combined = new Uint8Array(56);
        combined.set(left);
        combined.set(right, 28);
        subkeys.push(permute(combined, PC2));
    }
    return subkeys;
}

function feistel(R, subkey) {
    let expanded = permute(R, E);
    let xored = new Uint8Array(48);
    for (let i = 0; i < 48; i++) xored[i] = expanded[i] ^ subkey[i];

    let outputBits = new Uint8Array(32);
    for (let box = 0; box < 8; box++) {
        let offset = box * 6;
        let row = (xored[offset] << 1) | xored[offset + 5];
        let col = (xored[offset + 1] << 3) | (xored[offset + 2] << 2) | (xored[offset + 3] << 1) | xored[offset + 4];
        let val = S_BOXES[box][row * 16 + col];

        outputBits[box * 4 + 0] = (val >> 3) & 1;
        outputBits[box * 4 + 1] = (val >> 2) & 1;
        outputBits[box * 4 + 2] = (val >> 1) & 1;
        outputBits[box * 4 + 3] = val & 1;
    }
    return permute(outputBits, P);
}

function desBlock(blockBytes, subkeys, decrypt = false) {
    let blockBits = bytesToBits(blockBytes);
    let permutedBlock = permute(blockBits, IP);
    let left = permutedBlock.slice(0, 32);
    let right = permutedBlock.slice(32, 64);
    let keysToUse = decrypt ? [...subkeys].reverse() : subkeys;

    for (let round = 0; round < 16; round++) {
        let nextLeft = right;
        let fOut = feistel(right, keysToUse[round]);
        let nextRight = new Uint8Array(32);
        for (let i = 0; i < 32; i++) nextRight[i] = left[i] ^ fOut[i];
        left = nextLeft;
        right = nextRight;
    }

    let combined = new Uint8Array(64);
    combined.set(right); 
    combined.set(left, 32);
    return bitsToBytes(permute(combined, FP));
}

function tripleDesBlock(blockBytes, sk1, sk2, sk3, decrypt = false) {
    if (!decrypt) {
        let step1 = desBlock(blockBytes, sk1, false);
        let step2 = desBlock(step1, sk2, true);
        return desBlock(step2, sk3, false);
    } else {
        let step1 = desBlock(blockBytes, sk3, true);
        let step2 = desBlock(step1, sk2, false);
        return desBlock(step2, sk1, true);
    }
}

// --- Padding Standard PKCS#7 & Deteksi Kunci Salah ---
function padPKCS7(data) {
    let paddingLength = 8 - (data.length % 8);
    let padded = new Uint8Array(data.length + paddingLength);
    padded.set(data);
    for (let i = data.length; i < padded.length; i++) padded[i] = paddingLength;
    return padded;
}

function unpadPKCS7(data) {
    let paddingLength = data[data.length - 1];
    
    // Jika nilai padding di luar range (1-8), berarti hasil dekripsi berantakan akibat KUNCI SALAH
    if (paddingLength < 1 || paddingLength > 8) {
        throw new Error("Kunci yang Anda masukkan salah, atau file rusak!");
    }
    
    // Validasi struktur padding
    for (let i = data.length - paddingLength; i < data.length; i++) {
        if (data[i] !== paddingLength) {
            throw new Error("Kunci yang Anda masukkan salah, atau file rusak!");
        }
    }
    return data.slice(0, data.length - paddingLength);
}

function prepareKey(keyStr) {
    let bytes = new Uint8Array(8);
    for (let i = 0; i < 8; i++) {
        bytes[i] = i < keyStr.length ? keyStr.charCodeAt(i) & 0xFF : 0;
    }
    return bytes;
}

function process3DESCBC(dataBytes, k1Str, k2Str, k3Str, decrypt = false) {
    let sk1 = generateSubkeys(prepareKey(k1Str));
    let sk2_final = generateSubkeys(prepareKey(k2Str));
    let sk3 = generateSubkeys(prepareKey(k3Str));
    let iv = new Uint8Array(8); 

    if (!decrypt) {
        let padded = padPKCS7(dataBytes);
        let result = new Uint8Array(padded.length);
        let prevBlock = iv;

        for (let i = 0; i < padded.length; i += 8) {
            let block = padded.slice(i, i + 8);
            let xored = new Uint8Array(8);
            for (let j = 0; j < 8; j++) xored[j] = block[j] ^ prevBlock[j];

            let encrypted = tripleDesBlock(xored, sk1, sk2_final, sk3, false);
            result.set(encrypted, i);
            prevBlock = encrypted;
        }
        return result;
    } else {
        let result = new Uint8Array(dataBytes.length);
        let prevBlock = iv;

        for (let i = 0; i < dataBytes.length; i += 8) {
            if (i + 8 > dataBytes.length) break; 
            let block = dataBytes.slice(i, i + 8);
            let decrypted = tripleDesBlock(block, sk1, sk2_final, sk3, true);

            let plain = new Uint8Array(8);
            for (let j = 0; j < 8; j++) plain[j] = decrypted[j] ^ prevBlock[j];
            result.set(plain, i);
            prevBlock = block;
        }
        return unpadPKCS7(result);
    }
}


// ============================================================================
// TUGAS ARIF HIMAWAN: UI POPUP NOTIFIKASI
// ============================================================================

function showPopup(title, message, isError = false) {
    const popup = document.getElementById('customPopup');
    const titleEl = document.getElementById('popupTitle');
    const messageEl = document.getElementById('popupMessage');

    titleEl.textContent = title;
    messageEl.textContent = message;

    if (isError) {
        titleEl.className = 'text-error';
    } else {
        titleEl.className = 'text-warning'; 
    }

    popup.classList.remove('hidden');
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);
}

function closePopup() {
    const popup = document.getElementById('customPopup');
    popup.classList.remove('show');
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 300);
}


// ============================================================================
// TUGAS M. ABTHAL ANTARESA (STREAM CONTROLLER & FILE READER MANAGEMENT)
// ============================================================================

function processFile(action) {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const k1 = document.getElementById('key1').value;
    const k2 = document.getElementById('key2').value;
    const k3 = document.getElementById('key3').value;

    if (!file) {
        showPopup("Dokumen Belum Dipilih", "Silakan pilih dan unggah dokumen terlebih dahulu melalui form yang tersedia.", false);
        return;
    }
    if (!k1 || !k2 || !k3) {
        showPopup("Kunci Tidak Lengkap", "Ketiga kombinasi kunci mandiri (K1, K2, K3) harus diisi. Jika ingin menggunakan kunci yang sama, ketik berulang.", false);
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function(e) {
        const arrayBuffer = e.target.result;
        const fileBytes = new Uint8Array(arrayBuffer);

        try {
            let resultBytes;
            let outputFileName;

            if (action === 'encrypt') {
                resultBytes = process3DESCBC(fileBytes, k1, k2, k3, false);
                outputFileName = file.name + '.enc';
            } else {
                resultBytes = process3DESCBC(fileBytes, k1, k2, k3, true);
                outputFileName = file.name.endsWith('.enc') ? file.name.slice(0, -4) : 'decrypted_' + file.name;
            }

            triggerDownload(resultBytes, outputFileName);

        } catch (error) {
            showPopup("Gagal Memproses File", error.message, true);
        }
    };

    reader.readAsArrayBuffer(file);
}


// ============================================================================
// TUGAS ARIF HIMAWAN: LOGIKA ALUR UNDUH
// ============================================================================

function triggerDownload(resultBytes, fileName) {
    const blob = new Blob([resultBytes], { type: "application/octet-stream" });
    const downloadSection = document.getElementById('downloadSection');
    const downloadLink = document.getElementById('downloadLink');

    if(downloadLink.href) {
        URL.revokeObjectURL(downloadLink.href);
    }

    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    
    downloadSection.classList.remove('hidden');
    downloadSection.scrollIntoView({ behavior: 'smooth' });
}
