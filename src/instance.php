<?php

namespace debugger;

class instance
{
	const LEVEL_LOG = 'log';
	const LEVEL_INFO = 'info';
	const LEVEL_ERROR = 'error';
	const LEVEL_WARNING = 'warn';

	protected $enabled = false;
	protected $label = 'Debugger';
	protected $queue = [];
	protected static $count = 0;

	public function __construct($label = null)
	{
		if (strpos(filter_input(INPUT_SERVER, 'HTTP_USER_AGENT'), 'cfs100/debugger') !== false) {
			if (php_sapi_name() != 'cli') {
				$this->enabled = true;
				ob_start();
			}
		}
		if (!is_null($label)) {
			$this->label = $label;
		}
	}

	public function __destruct()
	{
		if (headers_sent() || !$this->enabled) {
			return;
		}
		$buffer = ob_get_clean();
		foreach ($this->queue as $message) {
			header("Debugger|{$message['id']}: " . json_encode($message));
		}
		echo $buffer;
	}

	protected function add($message, $level)
	{
		$id = uniqid();

		$this->queue[$id] = [
			'id' => $id,
			'count' => ++$this::$count,
			'level' => $level,
			'label' => $this->label,
			'time' => microtime(true),
			'information' => $message,
		];

		return $id;
	}

	public function log($message)
	{
		return $this->add($message, static::LEVEL_LOG);
	}

	public function info($message)
	{
		return $this->add($message, static::LEVEL_INFO);
	}

	public function error($message)
	{
		return $this->add($message, static::LEVEL_ERROR);
	}

	public function warning($message)
	{
		return $this->add($message, static::LEVEL_WARNING);
	}

	public function remove($id)
	{
		if (!isset($this->queue[$id])) {
			return false;
		}
		unset($this->queue[$id]);
		return true;
	}

	public function clean()
	{
		$count = count($this->queue);
		$this->queue = [];
		return $count;
	}
}
