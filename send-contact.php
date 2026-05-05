<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Metodo non consentito.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$configPath = __DIR__ . '/mail-config.php';

if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Configurazione email mancante sul server.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$config = require $configPath;
$requiredKeys = ['site_name', 'to_email', 'from_email', 'from_name', 'envelope_from'];

foreach ($requiredKeys as $key) {
    if (empty($config[$key])) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Configurazione email incompleta sul server.',
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

$nome = trim((string) ($_POST['nome'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$telefono = trim((string) ($_POST['telefono'] ?? ''));
$trattamento = trim((string) ($_POST['trattamento'] ?? ''));
$messaggio = trim((string) ($_POST['messaggio'] ?? ''));
$origine = trim((string) ($_POST['origine'] ?? 'Sito'));
$sezione = trim((string) ($_POST['sezione'] ?? ''));
$termini = trim((string) ($_POST['termini'] ?? ''));

if ($nome === '' || $messaggio === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $termini === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Compila correttamente i campi obbligatori.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$trattamenti = [
    '4-6-mani' => '4/6 Mani',
    'capelli' => 'Capelli',
    'corpo' => 'Viso & cosmetologia',
    'mani-piedi' => 'Mani & piedi',
    'brow-lash' => 'Brow & lash bar',
    'epilazione' => 'Epilazione',
    'Viso & cosmetologia' => 'Viso & cosmetologia',
];

$trattamentoLabel = $trattamenti[$trattamento] ?? ($trattamento !== '' ? $trattamento : 'Non specificato');
$telefonoLabel = $telefono !== '' ? $telefono : 'Non indicato';
$sezioneLabel = $sezione !== '' ? $sezione : 'Non specificata';
$siteName = (string) $config['site_name'];
$subject = '[' . $siteName . '] Nuova richiesta dal sito';

$body = implode("\n", [
    'Nuova richiesta dal sito ' . $siteName,
    '',
    'Pagina di origine: ' . $origine,
    'Sezione di riferimento: ' . $sezioneLabel,
    'Nome e cognome: ' . $nome,
    'Email: ' . $email,
    'Telefono: ' . $telefonoLabel,
    'Trattamento di interesse: ' . $trattamentoLabel,
    'Consenso privacy: Accettato',
    '',
    'Messaggio:',
    $messaggio,
    '',
    'Inviato il: ' . date('d/m/Y H:i'),
]);

$headers = 'From: ' . formatAddress((string) $config['from_email'], (string) $config['from_name']) . "\r\n";
$headers .= 'Reply-To: ' . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail(
    (string) $config['to_email'],
    $subject,
    $body,
    $headers,
    '-f' . (string) $config['envelope_from']
);

if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Richiesta inviata con successo. Ti ricontatteremo al piu presto.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(500);
echo json_encode([
    'success' => false,
    'message' => 'Invio non riuscito. Riprova tra poco oppure contattaci via telefono o WhatsApp.',
], JSON_UNESCAPED_UNICODE);

function formatAddress(string $email, string $name): string
{
    $safeName = trim($name);

    if ($safeName === '') {
        return '<' . $email . '>';
    }

    return '=?UTF-8?B?' . base64_encode($safeName) . '?= <' . $email . '>';
}
